import axios from "axios";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';

import HomePage from "pages/home/HomePage";
import EmailPage from "pages/email/EmailPage";
import CalendarPage from "pages/calendar/CalendarPage";
import TrashPage from "pages/trash/TrashPage";
import CoursePage from "pages/course/CoursePage";

const generalRoutes = [
  {
    path: "/",
    element: <HomePage />,
    state: "home",
    sidebarProps: {
      displayText: "Home",
      icon: <HomeOutlinedIcon />,
    },
  },
  {
    path: "/email",
    element: <EmailPage />,
    state: "email",
    sidebarProps: {
      displayText: "Email",
      icon: <MarkunreadOutlinedIcon />,
    }
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
    state: "calendar",
    sidebarProps: {
      displayText: "Calendar",
      icon: <CalendarMonthOutlinedIcon />,
    }
  },
  {
    path: "/trash",
    element: <TrashPage />,
    state: "trash",
    sidebarProps: {
      displayText: "Trash",
      icon: <FolderDeleteOutlinedIcon />,
    }
  },
];

const API_BASE_URL = "http://localhost:3000/courses/";

const generateCourseRoutes = async () => {
  const response = await axios.get(API_BASE_URL);
  const courses = response.data;

  const routePromises = courses.map(async (course: any) => {
    const courseDataResponse = await axios.get(`${API_BASE_URL}${course.name}`);
    const courseData = courseDataResponse.data;
    const title = courseData.title;

    return {
      path: `/course/${course.name}`,
      element: (
        <CoursePage topbarTitle={courseData.title} courseID={course.name} />
      ),
      state: course.name,
      sidebarProps: {
        displayText: `${title}`,
      },
    };
  });

  const routes = await Promise.all(routePromises);

  return routes;
};

const courseRoutes = await generateCourseRoutes();

export { generalRoutes, courseRoutes };
