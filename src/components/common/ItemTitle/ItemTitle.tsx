import Typography from "@mui/material/Typography";

import { IconButton } from "@mui/material";
import { AiFillSetting } from "react-icons/ai";

import "./ItemTitle.css";

type ItemTitleProps = {
  title: string;
  settingIcon?: boolean;
  onIconClick?: () => void;
}

const ItemTitle = ({ title, settingIcon = true, onIconClick }: ItemTitleProps) => {
  return (
    <Typography className="item-title" variant="h6">
      <div className="title-div">
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
