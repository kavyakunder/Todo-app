import { makeStyles } from "@mui/styles";

export const useAppStyles = makeStyles((theme) => ({
  listContainer: {
    "& .MuiList-root": {
      margin: "1rem auto",
    },
  },
  list: {
    backgroundColor: "#F6C7FF",
    border: "2px solid #9C27B0",
    borderRadius: "10px",
    width: "50%",
  },
}));
