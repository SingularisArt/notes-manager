import React from "react";
import "./FigureCard.css";

type FigureCardProps = {
  cards: {
    title: string;
    figure_path: string;
  }[];
};

const FigureCard: React.FC<FigureCardProps> = ({ cards }) => {
  return (
    <>
      <div className="create-card">
        <div className="card-title">
          <input className="create-card-text" type="text" spellCheck={false} placeholder="New Figure" />
        </div>
        <div className="card-content"></div>
      </div>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className="card" style={{ gridRowStart: index === 0 ? "1" : "auto" }}>
            <div className="card-title">{card.title}</div>
            <div className="card-content"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FigureCard;
