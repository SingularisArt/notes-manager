import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  border: "1px solid #ccc",
  maxHeight: "650px",
  overflow: "auto",
}));

export default Item;
