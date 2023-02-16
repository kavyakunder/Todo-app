import { makeStyles } from "@mui/styles";

export const useAppStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: "#F6C7FF",
    border: "2px solid #9C27B0",
    borderRadius: "10px",
    margin: "1rem auto!important", //authored css was getting override by local user style
    width: "50%",
  },
}));
