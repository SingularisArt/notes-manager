export type APIfetchAllFigures = {
  courseID: string;
};

export type APIcreateFigure = {
  courseID: string;
  fileName: string;
  currentWeek: number;
};

export type APIgetFigureData = {
  courseID: string;
  figureTitle: string;
  currentWeek: number;
};

export type APIopenFigure = {
  courseID: string;
  figureTitle: string;
  currentWeek: number;
};

export type APIrenameFigure = {
  courseID: string;
  oldTitle: string;
  newTitle: string;
  currentWeek: number;
};

export type APIdeleteFigure = {
  courseID: string;
  figureTitle: string;
  currentWeek: number;
};
