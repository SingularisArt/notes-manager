import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import { BsTrash } from "react-icons/bs";

import ItemTitle from "components/common/ItemTitle/ItemTitle";

import "react-medium-image-zoom/dist/styles.css";

import { CourseData } from "utils/redux";

import "./Figure.css";

type FigureProps = {
  courseID: string;
};

type FigureData = {
  title: string;
  content: string | null;
};

type FigureDataMap = {
  [key: string]: FigureData[];
};

const Figure: React.FC<FigureProps> = ({ courseID }) => {
  const [data, setData] = useState<FigureDataMap>({});
  const [deleteFigureState, setDeleteFigureState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { courseData } = CourseData();
  const currentWeek = courseData.week;

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get<FigureDataMap>(
          `http://localhost:3000/courses/${courseID}/figures`
        );

        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllNotes();
  }, [courseID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const openFigure = async (card: FigureData) => {
    const fileName = encodeURIComponent(card.title.toLowerCase().replace(/\s/g, "-") + ".svg");
    const encodedFigurePath = encodeURIComponent(fileName);

    const newFigureData = await axios.get(`http://localhost:3000/courses/${courseID}/figures/open-figure?figure-name=${encodedFigurePath}&week-number=${currentWeek}`);
    const newContent = newFigureData.data;

    const currentWeekData = data[currentWeek];
    const selectedFigureIndex = currentWeekData.findIndex((figure) => figure.title === card.title);

    if (selectedFigureIndex !== -1) {
      const updatedWeekData = [...currentWeekData];
      updatedWeekData[selectedFigureIndex] = {
        ...updatedWeekData[selectedFigureIndex],
        content: newContent,
      };

      setData((prevData) => ({
        ...prevData,
        [currentWeek]: updatedWeekData,
      }));
    }
  };

  const createFigure = async (title: string) => {
    const fileName = encodeURIComponent(title.toLowerCase().replace(/\s/g, "-") + ".svg");
    const searchParams = `figure-name=${fileName}&week-number=${currentWeek}`;

    const beautifulTitleResponse = await axios.get(`http://localhost:3000/courses/${courseID}/figures/create-figure?${searchParams}`);
    const beautifulTitle = beautifulTitleResponse.data;

    const templateDataResponse = await axios.get(`http://localhost:3000/courses/${courseID}/figures/get-figure-data?${searchParams}`);
    const templateData = templateDataResponse.data;

    const newFigureData: FigureData = {
      title: beautifulTitle,
      content: templateData,
    };

    setData((prevData) => {
      const newData = { ...prevData };

      if (!newData[currentWeek]) {
        newData[currentWeek] = [];
      }
      newData[currentWeek].push(newFigureData);
      newData[currentWeek] = [...new Set(newData[currentWeek])];

      return newData;
    });

    const contentResponse = await axios.get(`http://localhost:3000/courses/${courseID}/figures/open-figure?${searchParams}`);
    const newContent = contentResponse.data;
    newFigureData.content = newContent;

    setData((prevData) => {
      const newData = { ...prevData };
      newData[currentWeek][newData[currentWeek].length - 1] = newFigureData;

      return newData;
    });

    console.log(data);
  };

  return (
    <>
      <ItemTitle
        title="Figures"
        onIconClick={() => setDeleteFigureState(!deleteFigureState)}
      />

      <Grid container spacing={0} className="card-grid">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <div className="create-card">
            <div className="card-title">
              <input
                className="create-card-text"
                type="text"
                spellCheck={false}
                placeholder="New Figure"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createFigure(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
            </div>
            <div className="card-content"></div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="card-grid">
        {data[currentWeek] &&
          data[currentWeek].map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
              <Zoom>
                <div className="card">
                  <div className="card-title">
                    {card.title}
                  </div>
                  <div className="card-content">
                    <BsTrash className={`delete-icon ${deleteFigureState ? "yes-delete" : "no-delete"}`} />
                    <img
                      className="card-image"
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(card.content || "")}`}
                      alt={card.title}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        openFigure(card);
                      }}
                    />
                  </div>
                </div>
              </Zoom>

            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Figure;
