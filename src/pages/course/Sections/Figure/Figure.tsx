import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";

import "./Figure.css";

type FigureProps = {
  courseID: string;
};

type FigureData = {
  title: string;
  figurePath: string;
};

const Figure: React.FC<FigureProps> = ({ courseID }) => {
  const [data, setData] = useState<{ [key: string]: FigureData[] }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get<{ [key: string]: string[] }>(
          `http://localhost:3000/courses/${courseID}/figures`
        );

        const figureData: { [key: string]: FigureData[] } = {};

        for (const key in res.data) {
          const figurePaths = res.data[key];
          const figures: FigureData[] = figurePaths.map((figurePath) => ({
            title: figurePath.replace(/^.*[\\\/]/, "").replace(".svg", ""),
            figurePath,
          }));
          figureData[key] = figures;
        }

        setData(figureData);
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

  return (
    <>
      <div className="create-card">
        <div className="card-title">
          <input
            className="create-card-text"
            type="text"
            spellCheck={false}
            placeholder="New Figure"
          />
        </div>
        <div className="card-content"></div>
      </div>

      <Grid container spacing={0} className="card-grid">
        {Object.keys(data).map((key) =>
          data[key].map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <div className="card">
                <div className="card-title">{card.title}</div>
                <div className="card-content">
                  <object data={card.figurePath} type="image/svg+xml">
                    <img src={card.figurePath} alt={card.title} />
                  </object>
                </div>
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Figure;
