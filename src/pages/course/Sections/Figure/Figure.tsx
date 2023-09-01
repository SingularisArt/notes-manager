import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  return (
    <>
      <Grid container spacing={0} className="card-grid">
        <Grid item xs={12} sm={6} md={6} lg={4}>
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
        </Grid>
      </Grid>

      <Grid container spacing={2} className="card-grid">
        {Object.keys(data).map((number) =>
          data[number].map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
              <div className="card">
                <div className="card-title">{card.title}</div>
                <div className="card-content">
                  <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      card.content || ""
                    )}`}
                    alt={card.title}
                    className="card-image"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
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
