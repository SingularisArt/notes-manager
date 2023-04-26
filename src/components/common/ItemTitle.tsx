import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { AiFillSetting } from "react-icons/ai";

interface ItemTitleProps {
  title: string;
  settingIcon?: boolean;
  onIconClick?: () => void;
}

const ItemTitle = ({ title, settingIcon = true, onIconClick }: ItemTitleProps) => {
  return (
    <Typography
      style={{
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        paddingTop: "10px",
        zIndex: 2,
      }}
      variant="h6"
      sx={{ pb: 0.5, borderBottom: "1px solid #8a8a8a" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {settingIcon === true && (
          <IconButton color="inherit" onClick={onIconClick}>
            <AiFillSetting />
          </IconButton>
        )}
        {title}
      </div>
    </Typography >
  );
};

export default ItemTitle;
