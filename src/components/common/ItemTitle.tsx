import Typography from "@mui/material/Typography";

interface ItemTitleProps {
  title: string;
}

const ItemTitle = ({ title }: ItemTitleProps) => {
  return (
    <Typography
      style={{
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        paddingTop: "10px",
        zIndex: 1,
      }}
      variant="h6"
      sx={{ pb: 0.5, borderBottom: "1px solid #8a8a8a" }}
    >
      {title}
    </Typography>
  );
};

export default ItemTitle;
