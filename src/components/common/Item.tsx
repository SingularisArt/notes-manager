import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import colorConfigs from "configs/colorConfigs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: colorConfigs.card.bg,
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: `1px solid ${colorConfigs.card.border}`,
  maxHeight: "600px",
  overflow: "auto",
  paddingLeft: "20px",
  paddingRight: "20px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
}));

export default Item;
