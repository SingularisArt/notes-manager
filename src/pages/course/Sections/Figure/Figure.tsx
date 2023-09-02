import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import { BsTrash } from "react-icons/bs";

import ItemTitle from "../../../../components/common/ItemTitle";

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
      <div className="card">
        <div className="card-title">{card.title}</div>
        <div className="card-content">
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

  const createFigure = async (title: string) => {
    const fileName = encodeURIComponent(title.toLowerCase().replace(/\s/g, "-") + ".svg")
    const res = await axios.get(`http://localhost:3000/courses/${courseID}/figures/`)
    const tempFiguresDir = res.data["figuresTempPath"]

    const formattedCurrentWeek = currentWeek < 10 ? `0${currentWeek}` : currentWeek
    const figurePath = `${tempFiguresDir}${formattedCurrentWeek}`
    const figureFilePath = `${tempFiguresDir}${formattedCurrentWeek}/${fileName}`
    const copyCMD = `mkdir -p ${figurePath}; cp -r ../src/data/template-figure.svg ${figureFilePath}`
    const inkscapeCMD = `inkscape ${figureFilePath}`

    const encodedCopyCMD = encodeURIComponent(copyCMD);
    await axios.get(`http://localhost:3000/cmd/command/${encodedCopyCMD}`)

    const encodedFigureFilePath = encodeURIComponent(figureFilePath);
    const figureData = await axios.get(`http://localhost:3000/courses/${courseID}/figures/${encodedFigureFilePath}`)

    const newFigureData: FigureData = {
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

    const encodedInkscapeCMD = encodeURIComponent(inkscapeCMD);
    await axios.get(`http://localhost:3000/cmd/command/${encodedInkscapeCMD}`)
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
