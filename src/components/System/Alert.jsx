import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  paper: {
    width: "100%",
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

const Alert = ({
  open,
  setOpen,
  content,
  size = "sm",
  customClose,
  customTitle,
}) => {
  const classes = useStyles();

  let close = () => {
    setOpen(false);
  };

  const stop = (event) => {
    event.stopPropagation();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      disableBackdropClick
      className={classes.dialog}
      open={open}
      onClose={close}
      onClick={stop}
      maxWidth={size}
      fullWidth
    >
      <DialogTitle>
        <IconButton onClick={close} className={classes.close}>
          <Close />
        </IconButton>
        {customTitle || null}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default Alert;
