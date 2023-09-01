import axios from "axios";

// Pages
import HomePage from "../pages/home/HomePage";
import EmailPage from "../pages/email/EmailPage";
import CalendarPage from "../pages/calendar/CalendarPage";
import CoursePage from "../pages/course/CoursePage";

// Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

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
];

const API_BASE_URL = "http://localhost:3000/courses/";

const generateCourseRoutes = async () => {
  try {
    // Fetch the list of courses
    const response = await axios.get(API_BASE_URL);
    const courses = response.data;

    // Fetch data for each course and create the route objects
    const routePromises = courses.map(async (course: any) => {
      const courseDataResponse = await axios.get(`${API_BASE_URL}${course.name}`);
      const courseData = courseDataResponse.data;
      const title = courseData.title.length > 15 ? courseData.title.substring(0, 15) + "..." : courseData.title;

      return {
        path: `/course/${course.name}`,
        element: (
          <CoursePage topbarTitle={courseData.title} courseID={course.name} />
        ),
        state: course.name,
        sidebarProps: {
          displayText: `${title} (${course.name.toUpperCase()})`,
        },
      };
    });

    const routes = await Promise.all(routePromises);

    return routes;
  } catch (error) {
    console.error("Error generating course routes: ", error);
    return [];
  }
};

const courseRoutes = await generateCourseRoutes();

export { generalRoutes, courseRoutes };
