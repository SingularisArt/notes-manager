import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import { BsTrash } from 'react-icons/bs';

import ItemTitle from 'components/common/ItemTitle/ItemTitle';

import 'react-medium-image-zoom/dist/styles.css';

import { CourseData } from 'utils/redux';

import './Figure.css';

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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { courseData } = CourseData();
  const currentWeek = courseData.week;

  useEffect(() => {
    const fetchAllNotes = async () => {
      const res = await axios.get<FigureDataMap>(
        `http://localhost:3000/courses/${courseID}/figures`
      );

      setData(res.data);
      setIsLoading(false);
    };
    fetchAllNotes();
  }, [courseID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sortDataAlphabetically = () => {
    setData((prevData) => {
      const sortedData: FigureDataMap = { ...prevData };
      sortedData[currentWeek].sort((a, b) => a.title.localeCompare(b.title));
      return sortedData;
    });
  };

  const titleText = (title: string): string => {
    return title.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const openFigure = async (figure: FigureData, index: number) => {
    const fileName = encodeURIComponent(
      figure.title.toLowerCase().replace(/\s/g, '-') + '.svg'
    );
    const encodedFigurePath = encodeURIComponent(fileName);

    const searchParams = `figure-name=${encodedFigurePath}&week-number=${currentWeek}`;
    const newFigureData = await axios.get(
      `http://localhost:3000/courses/${courseID}/figures/open-figure?${searchParams}`
    );
    const newContent = newFigureData.data;

    const currentWeekData = data[currentWeek];
    currentWeekData[index].content = newContent;

    setData((prevData) => ({
      ...prevData,
      [currentWeek]: currentWeekData,
    }));
  };

  const createFigure = async (title: string) => {
    const fileName = encodeURIComponent(
      title.toLowerCase().replace(/\s/g, '-') + '.svg'
    );
    const searchParams = `figure-name=${fileName}&week-number=${currentWeek}`;

    const beautifulTitleResponse = await axios.get(
      `http://localhost:3000/courses/${courseID}/figures/create-figure?${searchParams}`
    );
    const beautifulTitle = beautifulTitleResponse.data;

    const templateDataResponse = await axios.get(
      `http://localhost:3000/courses/${courseID}/figures/get-figure-data?${searchParams}`
    );
    const templateData = templateDataResponse.data;

    const newFigureData: FigureData = {
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

    const contentResponse = await axios.get(
      `http://localhost:3000/courses/${courseID}/figures/open-figure?${searchParams}`
    );
    const newContent = contentResponse.data;
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

  const renameFigure = async (
    oldTitle: string,
    newTitle: string,
    index: number
  ) => {
    const oldFileName = encodeURIComponent(
      oldTitle.toLowerCase().replace(/\s/g, '-') + '.svg'
    );
    const newFileName = encodeURIComponent(
      newTitle.toLowerCase().replace(/\s/g, '-') + '.svg'
    );
    const searchParams = `old-name=${oldFileName}&new-name=${newFileName}&week-number=${currentWeek}`;

    await axios.get(
      `http://localhost:3000/courses/${courseID}/figures/rename-figure?${searchParams}`
    );

    const currentWeekData = data[currentWeek];
    currentWeekData[index].title = titleText(newTitle);

    setData((prevData) => ({
      ...prevData,
      [currentWeek]: currentWeekData,
    }));

    sortDataAlphabetically();
  };

  return (
    <>
      <ItemTitle title="Figures" onIconClick={() => setEditMode(!editMode)} />

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
                    createFigure(e.currentTarget.value);
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
                          renameFigure(figure.title, newTitle, index);

                          e.currentTarget.value = titleText(newTitle);
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
                    onContextMenu={(e) => {
                      e.preventDefault();
                      openFigure(figure, index);
                    }}
                  />
                  <BsTrash
                    className={`edit-figure ${editMode ? 'enable' : 'disable'}`}
                  />
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Figure;
