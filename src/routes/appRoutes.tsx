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

const courseRoutes = [
  {
    path: "/course/mth-253",
    element: <CoursePage
      topbarTitle="Calculus 3"
      courseID="mth-253"
    />,
    state: "mth-253",
    sidebarProps: {
      displayText: "Calculus 3 (MTH-253)",
    },
  },
  {
    path: "/course/phy-123",
    element: <CoursePage
      topbarTitle="Physics 123"
      courseID="phy-123"
    />,
    state: "phy-123",
    sidebarProps: {
      displayText: "Physics 123 (PHY-123)",
    }
  },
  {
    path: "/course/psy-202a",
    element: <CoursePage
      topbarTitle="Psychology 202"
      courseID="psy-202a"
    />,
    state: "psy-202",
    sidebarProps: {
      displayText: "Psychology 202A (PSY-202)",
    }
  },
];

export { generalRoutes, courseRoutes };
