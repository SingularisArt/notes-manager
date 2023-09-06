import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

type ButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  const cache = createCache({
    key: 'css',
    prepend: true,
  });

  return (
    <CacheProvider value={cache}>
      <MuiButton variant="contained" className={className} onClick={onClick}>
        {text}
      </MuiButton>
    </CacheProvider>
  );
};

export default Button;
