import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import colorConfigs from "../../../../configs/colorConfigs";
import { BsTrash } from "react-icons/bs";

import ItemTitle from "../../../../components/common/ItemTitle/ItemTitle";

import "react-medium-image-zoom/dist/styles.css";

import { CourseData } from "../../../../utils/redux";

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

  const cardData = (card: FigureData, drawTrash: boolean) => {
    return (
      <div className="card" style={{ backgroundColor: colorConfigs.figure.bg, color: colorConfigs.figure.color }}>
        <div className="card-title" style={{ backgroundColor: colorConfigs.figure.title.bg, color: colorConfigs.figure.title.color }}>
          {card.title}
        </div>
        <div className="card-content" style={{ backgroundColor: colorConfigs.figure.content.bg, color: colorConfigs.figure.content.color }}>
          {drawTrash && (
            <BsTrash
              className="delete-icon"
              style={{
                color: "red",
              }}
            />
          )}
          <img
            className="card-image"
            src={`data:image/svg+xml;utf8,${encodeURIComponent(card.content || "")}`}
            alt={card.title}
            onContextMenu={(e) => {
              e.preventDefault();
              openFigure(card.title);
            }}
          />
        </div>
      </div>
    );
  };

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

  const openFigure = async (figureName: string) => {
    const fileName = encodeURIComponent(figureName.toLowerCase().replace(/\s/g, "-") + ".svg")
    const encodedFigurePath = encodeURIComponent(fileName);
    await axios.get(`http://localhost:3000/courses/${courseID}/figures/open-figure?figure-name=${encodedFigurePath}&week-number=${currentWeek}`)
  };

  const createFigure = async (title: string) => {
    const fileName = encodeURIComponent(title.toLowerCase().replace(/\s/g, "-") + ".svg")
    const searchParams = `?figure-name=${fileName}&week-number=${currentWeek}`

    await axios.get(`http://localhost:3000/courses/${courseID}/figures/create-figure${searchParams}`)
    let figureData = await axios.get(`http://localhost:3000/courses/${courseID}/figures/get-figure-data${searchParams}`)

    let newFigureData: FigureData = {
      title: title,
      content: figureData.data || "",
    };

    setData((prevData) => {
      const newData = { ...prevData };

      if (!newData[currentWeek]) {
        newData[currentWeek] = [];
      }
      newData[currentWeek].push(newFigureData);

      return newData;
    });

    await axios.get(`http://localhost:3000/courses/${courseID}/figures/open-figure${searchParams}`)
  }

  return (
    <>
      <ItemTitle
        title="Figures"
        onIconClick={() => setDeleteFigureState(!deleteFigureState)}
      />

      <Grid container spacing={0} className="card-grid">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <div className="create-card">
            <div className="card-title" style={{
              backgroundColor: colorConfigs.figure.title.bg,
              color: colorConfigs.figure.title.color
            }}>
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
            <div className="card-content" style={{ backgroundColor: colorConfigs.figure.content.bg, color: colorConfigs.figure.content.color }}></div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="card-grid">
        {data[currentWeek] &&
          data[currentWeek].map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
              {!deleteFigureState ? (
                <Zoom>{cardData(card, false)}</Zoom>
              ) : (
                cardData(card, true)
              )}
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Figure;
