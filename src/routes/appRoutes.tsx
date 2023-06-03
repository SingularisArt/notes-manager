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
      icon: <HomeOutlinedIcon />,
    }
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
    sidebarProps: {
      displayText: "Course",
      icon: <ClassOutlinedIcon />,
    },
    child: [
      {
        path: "/course/mth-253",
        element: <CoursePage />,
        state: "mth-253",
        sidebarProps: {
          displayText: "MTH-253",
          icon: <CalendarMonthOutlinedIcon />,
        },
      },
      {
        path: "/course/phy-123",
        element: <CoursePage />,
        state: "phy-123",
        sidebarProps: {
          displayText: "PHY-123",
          icon: <CalendarMonthOutlinedIcon />,
        }
      },
      {
        path: "/course/PSY-202a",
        element: <CoursePage />,
        state: "psy-202a",
        sidebarProps: {
          displayText: "PSY-202A",
          icon: <CalendarMonthOutlinedIcon />,
        }
      },
    ],
  },
];

export default appRoutes;
