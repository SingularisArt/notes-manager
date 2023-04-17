import { RouteType } from "./config";

// Pages
import HomePage from "../pages/home/HomePage";
import EmailPage from "../pages/email/EmailPage";
import CalendarPage from "../pages/calendar/CalendarPage";
import CoursePage from "../pages/course/CoursePage";

// Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

const appRoutes: RouteType[] = [
  {
    index: true,
    path: "/home",
    element: <HomePage />,
    state: "home",
    sidebarProps: {
      displayText: "Home",
      icon: <HomeOutlinedIcon />
    }
  },
  {
    path: "/email",
    element: <EmailPage />,
    state: "email",
    sidebarProps: {
      displayText: "Email",
      icon: <MarkunreadOutlinedIcon />
    }
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
    state: "calendar",
    sidebarProps: {
      displayText: "Calendar",
      icon: <CalendarMonthOutlinedIcon />
    }
  },
  {
    path: "/course",
    element: <CoursePage />,
    state: "course",
    sidebarProps: {
      displayText: "Course",
      icon: <ClassOutlinedIcon />
    }
  },
];

export default appRoutes;
