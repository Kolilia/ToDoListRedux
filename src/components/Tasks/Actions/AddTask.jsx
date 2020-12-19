import {
  Button,
  DialogActions,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, LoadingCircular } from "../../System";

const useStyles = makeStyles({
  form: {
    fontSize: "1rem",
  },
  field: {
    marginBottom: "1rem",
  },
});

const AddTask = ({ open, setOpen }) => {
  const classes = useStyles();
  const [touchesTitle, setTouchesTitle] = useState(false);
  const loading = useSelector((state) => state.tasks.loading);
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "title") {
      setPayload((prevState) => {
        return { ...prevState, title: value };
      });
      setTouchesTitle(true);
    }

    if (name === "description") {
      setPayload((prevState) => {
        return { ...prevState, description: value };
      });
    }

    if (name === "completed") {
      setPayload((prevState) => {
        return { ...prevState, completed: checked };
      });
    }
  };

  const confirm = () => {
    if (!touchesTitle) {
      setTouchesTitle(true);
    }

    if (!payload.title) {
      return;
    }

    dispatch({ type: "ADD_TASK", payload: payload });

    setOpen(false);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <Alert
      open={open}
      setOpen={setOpen}
      content={
        <div className={classes.form}>
          <div className={classes.field}>
            <TextField
              name="title"
              onChange={onChange}
              label="Заголовок"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Введите заголовок..."
              variant="outlined"
              size="small"
              required
              fullWidth
            />
            {touchesTitle && !payload?.title && (
              <FormHelperText error>Поле обязательное!</FormHelperText>
            )}
          </div>
          <div className={classes.field}>
            <TextField
              name="description"
              label="Описание"
              onChange={onChange}
              placeholder="Введите описание..."
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              multiline
              rows={3}
              fullWidth
            />
          </div>
          <div className={classes.field}>
            <FormControlLabel
              value={payload.completed}
              label="Отметить сразу выполненной"
              control={
                <Switch value={true} name="completed" onChange={onChange} />
              }
            />
          </div>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={close}>
              Закрыть
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={confirm}
              disabled={loading}
              style={{ backgroundColor: green[400] }}
            >
              Создать
              <LoadingCircular loading={loading} />
            </Button>
          </DialogActions>
        </div>
      }
      customTitle="Добавить задачу"
      size="xs"
    />
  );
};

export default AddTask;
