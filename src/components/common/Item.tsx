import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: "1px solid #ccc",
  maxHeight: "600px",
  overflow: "auto",
  paddingLeft: "20px",
  paddingRight: "20px",
  display: "flex",
  flexDirection: "column",
}));

export default Item;
