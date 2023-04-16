import Typography from '@mui/material/Typography';

interface ItemTitleProps {
  title: string;
}

const ItemTitle = ({ title }: ItemTitleProps) => {
  return (
    <Typography variant="h6" sx={{ pb: 0.5, borderBottom: '1px solid #8a8a8a' }}>
      {title}
    </Typography>
  );
};

export default ItemTitle;
