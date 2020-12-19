import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  buttonProgress: {
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

function LoadingCircular({ loading, color }) {
  const classes = useStyles();
  return loading ? (
    <CircularProgress
      size={24}
      className={classes.buttonProgress}
      style={{ color: color || "#fff" }}
    />
  ) : null;
}

export default LoadingCircular;
