import React from "react";

import "./Figure.css";

type FigureProps = {
  data: {
    title: string;
    figurePath: string;
  }[];
};

const Figure: React.FC<FigureProps> = ({ data }) => {
  return (
    <>
      <div className="create-card">
        <div className="card-title">
          <input className="create-card-text" type="text" spellCheck={false} placeholder="New Figure" />
        </div>
        <div className="card-content"></div>
      </div>

      <div className="card-grid">
        {data.map((card, index) => (
          <div key={index} className="card" style={{ gridRowStart: index === 0 ? "1" : "auto" }}>
            <div className="card-title">{card.title}</div>
            <div className="card-content">

              <img src={card.figurePath} alt={card.title}/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Figure;
