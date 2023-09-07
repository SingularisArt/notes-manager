export type FigureProps = {
  courseID: string;
};

export type FigureData = {
  title: string;
  content: string | null;
};

export type FigureDataMap = {
  [key: string]: FigureData[];
};

export type deleteFigurePopupProps = {};

export type titleText = {
  title: string;
};

export type openFigure = {
  figure: FigureData;
  index: number;
};

export type createFigure = {
  title: string;
};

export type renameFigure = {
  oldTitle: string;
  newTitle: string;
  index: number;
};

export type deleteFigure = {
  index: number;
};

export type displayFigure = {
  figure: FigureData;
  index: number;
};

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
