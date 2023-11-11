import axios from 'axios';
import { FigureAPITypes } from './Types/index';

const baseURL = 'http://localhost:3000/courses';

export const fetchAllFigures = async ({
  courseID,
}: FigureAPITypes.APIfetchAllFigures) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const response = await axios.get(`${baseURL}/${encodedCourseID}/figures`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFigure = async ({
  courseID,
  fileName,
  currentWeek,
}: FigureAPITypes.APIcreateFigure) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedFileName = encodeURIComponent(fileName);
    const encodedWeekNumber = encodeURIComponent(currentWeek);

    const searchParams = `figure-name=${encodedFileName}&week-number=${encodedWeekNumber}`;

    const beautifulTitleResponse = await axios.get(
      `${baseURL}/${encodedCourseID}/figures/create-figure?${searchParams}`
    );

    return beautifulTitleResponse.data;
  } catch (error) {
    throw error;
  }
};

export const getFigureData = async ({
  courseID,
  figureTitle,
  currentWeek,
}: FigureAPITypes.APIgetFigureData) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedFileTitle = encodeURIComponent(figureTitle);
    const encodedWeekNumber = encodeURIComponent(currentWeek);

    const searchParams = `figure-name=${encodedFileTitle}&week-number=${encodedWeekNumber}`;

    const templateDataResponse = await axios.get(
      `${baseURL}/${encodedCourseID}/figures/get-figure-data?${searchParams}`
    );

    return templateDataResponse.data;
  } catch (error) {
    throw error;
  }
};

export const openFigure = async ({
  courseID,
  figureTitle,
  currentWeek,
}: FigureAPITypes.APIopenFigure) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedFileTitle = encodeURIComponent(figureTitle);
    const encodedWeekNumber = encodeURIComponent(currentWeek);

    const searchParams = `figure-name=${encodedFileTitle}&week-number=${encodedWeekNumber}`;

    const contentResponse = await axios.get(
      `${baseURL}/${encodedCourseID}/figures/open-figure?${searchParams}`
    );

    return contentResponse.data;
  } catch (error) {
    throw error;
  }
};

export const renameFigure = async ({
  courseID,
  oldTitle,
  newTitle,
  currentWeek,
}: FigureAPITypes.APIrenameFigure) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedOldFigureTitle = encodeURIComponent(oldTitle);
    const encodedNewFigureTitle = encodeURIComponent(newTitle);
    const encodedWeekNumber = encodeURIComponent(currentWeek);

    const searchParams = `old-name=${encodedOldFigureTitle}&new-name=${encodedNewFigureTitle}&week-number=${encodedWeekNumber}`;

    await axios.get(
      `${baseURL}/${encodedCourseID}/figures/rename-figure?${searchParams}`
    );
  } catch (error) {
    throw error;
  }
};

export const deleteFigure = async ({
  courseID,
  figureTitle,
  currentWeek,
}: FigureAPITypes.APIdeleteFigure) => {
  try {
    const encodedCourseID = encodeURIComponent(courseID);
    const encodedFigureTitle = encodeURIComponent(figureTitle);
    const encodedWeekNumber = encodeURIComponent(currentWeek);

    const searchParams = `name=${encodedFigureTitle}&week-number=${encodedWeekNumber}`;
    await axios.get(
      `${baseURL}/${encodedCourseID}/figures/delete-figure?${searchParams}`
    );
  } catch (error) {
    throw error;
  }
};
