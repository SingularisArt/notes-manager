import { Badge, IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";

const Notification = () => {
  return (
    <IconButton color="inherit">
      <Badge badgeContent={5} color="error">
        <Notifications />
      </Badge>
    </IconButton>
  );
};

export default Notification;
