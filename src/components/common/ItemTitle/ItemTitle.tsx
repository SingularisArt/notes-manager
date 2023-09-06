import React from 'react';
import Typography from '@mui/material/Typography';

import { IconButton } from '@mui/material';
import { AiFillSetting } from 'react-icons/ai';

import './ItemTitle.css';

type ItemTitleProps = {
  title: string;
  settingIcon?: boolean;
  onClick?: () => void;
};

const ItemTitle: React.FC<ItemTitleProps> = ({
  title,
  settingIcon = true,
  onClick,
}: ItemTitleProps) => {
  return (
    <Typography className="item-title" variant="h6">
      <div className="title-div">
        {settingIcon === true && (
          <IconButton color="inherit" onClick={onClick}>
            <AiFillSetting />
          </IconButton>
        )}
        {title}
      </div>
    </Typography>
  );
};

export default ItemTitle;
