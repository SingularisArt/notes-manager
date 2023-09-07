import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Zoom from 'react-medium-image-zoom';
import { BsTrash } from 'react-icons/bs';

import * as API from './FigureAPI';
import * as Types from './FigureTypes';
import * as PopupFunctions from 'utils/Popup';

import Popup from 'components/common/Popup/Popup';
import ItemTitle from 'components/common/ItemTitle/ItemTitle';

import 'react-medium-image-zoom/dist/styles.css';

import { CourseData } from 'utils/redux';

import './Figure.css';

const Figure: React.FC<Types.FigureProps> = ({ courseID }) => {
  const [data, setData] = useState<Types.FigureDataMap>({});
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [deleteFigureIndex, setDeleteFigureIndex] = useState<number>(0);

  const { courseData } = CourseData();
  const currentWeek = courseData.week;

  useEffect(() => {
    const fetchAllNotes = async () => {
      const figures = await API.fetchAllFigures({ courseID: courseID });

      setData(figures);
      setIsLoading(false);
    };
    fetchAllNotes();
  }, [courseID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sortDataAlphabetically = () => {
    setData((prevData) => {
      const sortedData: Types.FigureDataMap = { ...prevData };
      sortedData[currentWeek].sort((a, b) => a.title.localeCompare(b.title));
      return sortedData;
    });
  };

  const okDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setEditMode(false);
    deleteFigure({ index: deleteFigureIndex });
  };

  const titleText = ({ title }: Types.titleText): string => {
    return title.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const openFigure = async ({ figure, index }: Types.openFigure) => {
    const fileName = figure.title.toLowerCase().replace(/\s/g, '-') + '.svg';
    const newContent = await API.openFigure({
      courseID: courseID,
      figureTitle: fileName,
      currentWeek: currentWeek,
    });

    const currentWeekData = data[currentWeek];
    currentWeekData[index].content = newContent;

    setData((prevData) => ({
      ...prevData,
      [currentWeek]: currentWeekData,
    }));
  };

  const createFigure = async ({ title }: Types.createFigure) => {
    const fileName = title.toLowerCase().replace(/\s/g, '-') + '.svg';
    const beautifulTitle = await API.createFigure({
      courseID: courseID,
      fileName: fileName,
      currentWeek: currentWeek,
    });
    const templateData = await API.getFigureData({
      courseID: courseID,
      figureTitle: fileName,
      currentWeek: currentWeek,
    });

    const newFigureData: Types.FigureData = {
      title: beautifulTitle,
      content: templateData,
    };

    setData((prevData) => {
      const newData = { ...prevData };

      if (!newData[currentWeek]) {
        newData[currentWeek] = [];
      }
      newData[currentWeek].push(newFigureData);
      newData[currentWeek] = [...new Set(newData[currentWeek])];

      return newData;
    });

    sortDataAlphabetically();

    const newContent = await API.openFigure({
      courseID: courseID,
      figureTitle: fileName,
      currentWeek: currentWeek,
    });
    newFigureData.content = newContent;

    setData((prevData) => {
      const newData = { ...prevData };
      const index = newData[currentWeek].findIndex(
        (figure) => figure.title === newFigureData.title
      );
      newData[currentWeek][index] = newFigureData;

      return newData;
    });
  };

  const renameFigure = async ({
    oldTitle,
    newTitle,
    index,
  }: Types.renameFigure) => {
    const oldFileName = oldTitle.toLowerCase().replace(/\s/g, '-');
    const newFileName = newTitle.toLowerCase().replace(/\s/g, '-');

    await API.renameFigure({
      courseID: courseID,
      oldTitle: oldFileName,
      newTitle: newFileName,
      currentWeek: currentWeek,
    });

    const currentWeekData = data[currentWeek];
    currentWeekData[index].title = titleText({ title: newTitle });

    setData((prevData) => ({
      ...prevData,
      [currentWeek]: currentWeekData,
    }));

    sortDataAlphabetically();
  };

  const deleteFigure = async ({ index }: Types.deleteFigure) => {
    const fileName = data[currentWeek][index].title
      .toLowerCase()
      .replace(/\s/g, '-');
    await API.deleteFigure({
      courseID: courseID,
      figureTitle: fileName,
      currentWeek: currentWeek,
    });

    setData((prevData) => {
      const newData = { ...prevData };
      newData[currentWeek].splice(index, 1);
      return newData;
    });
  };

  const displayFigure = ({ figure, index }: Types.displayFigure) => {
    return (
      <div className="figure">
        <div className="figure-title">
          {editMode ? (
            <input
              className="figure-name"
              placeholder="Figure Name"
              type="text"
              spellCheck={false}
              defaultValue={figure.title}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const newTitle = e.currentTarget.value;
                  renameFigure({ oldTitle: figure.title, newTitle, index });

                  e.currentTarget.value = titleText({ title: newTitle });
                  e.currentTarget.blur();
                  setEditMode(false);
                }
              }}
            />
          ) : (
            figure.title
          )}
        </div>
        <div className="figure-content">
          <img
            className="figure-image"
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              figure.content || ''
            )}`}
            alt={figure.title}
          />
          <BsTrash
            onClick={() => {
              setIsDeletePopupOpen(true);
              setDeleteFigureIndex(index);
              setDeleteFigureIndex(index);
            }}
            className={`edit-figure ${editMode ? 'enable' : 'disable'}`}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <ItemTitle title="Figures" onClick={() => setEditMode(!editMode)} />

      <Grid container spacing={0} className="figure-grid">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <div className="create-figure">
            <div className="figure-title">
              <input
                className="create-figure-text"
                type="text"
                spellCheck={false}
                placeholder="New Figure"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createFigure({ title: e.currentTarget.value });
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
            <div className="figure-content"></div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="figure-grid">
        {data[currentWeek] &&
          data[currentWeek].map((figure, index) => (
            <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
              {!editMode ? (
                <div
                  onContextMenu={(e) => {
                    e.preventDefault();
                    openFigure({
                      figure: figure,
                      index: index,
                    });
                  }}
                >
                  <Zoom zoomMargin={50}>
                    {displayFigure({ figure, index })}
                  </Zoom>
                </div>
              ) : (
                displayFigure({ figure, index })
              )}
            </Grid>
          ))}
      </Grid>

      <Popup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onOk={okDeletePopup}
        content={PopupFunctions.deleteFigurePopup()}
        centerButtons={true}
        className="delete-popup"
      />
    </>
  );
};

export default Figure;
