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
