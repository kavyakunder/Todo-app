import { makeStyles } from "@mui/styles";

export const useTodoListStyles = makeStyles((theme) => ({
  listChecked: {
    textDecoration: "line-through !important",
  },
  listUnchecked: {
    textDecoration: "none",
  },
  deleteIcon: {
    color: "#2A3038",
  },
}));
