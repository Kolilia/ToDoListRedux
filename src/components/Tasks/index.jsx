import {
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Add, Check, Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddTask from "./Actions/AddTask";

const useStyles = makeStyles({
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    overflowY: "auto",
    fontSize: "1rem",
    maxHeight: 600,
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notCompletedTask: {
    backgroundColor: "#fff",
  },
  completedTask: {
    backgroundColor: green[400],
  },
  line: {
    marginBottom: ".5rem",
    marginTop: ".5rem",
  },
  actionsTask: {
    display: "flex",
  },
  title: {
    color: grey[600],
    textAlign: "center",
    margin: 0,
  },
});

const Tasks = () => {
  const classes = useStyles();
  const history = useHistory();
  const [filter, setFilter] = useState("All");
  const [tasksItems, setTaskItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const loading = useSelector((state) => state.tasks.loading);
  const intermediateData = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_TASKS" });
  }, [dispatch]);

  useEffect(() => {
    if (intermediateData.length > 0) {
      setTaskItems(intermediateData);
    }
  }, [intermediateData]);

  const listItems = tasksItems.map((item) => {
    function goToDetail() {
      history.push(`/${item?.id}`);
    }

    const completeTask = (event) => {
      event.stopPropagation();
      dispatch({ type: "CHANGE_TASK", payload: { ...item, completed: true } });
    };

    return (
      <ListItem
        button
        key={item?.id}
        onClick={goToDetail}
        className={
          item?.completed ? classes.completedTask : classes.notCompletedTask
        }
      >
        <ListItemText
          primary={
            <div className={classes.task}>
              <div>{item?.title}</div>
              <div className={classes.actionsTask}>
                {!item?.completed && (
                  <IconButton onClick={completeTask}>
                    <Check />
                  </IconButton>
                )}

                <IconButton>
                  <Delete />
                </IconButton>
              </div>
            </div>
          }
          secondary={item?.description}
        />
      </ListItem>
    );
  });

  /* Если бы был нормальный бэкенд(а не mockapi), то резализация фильтров была бы сделана через бэкенд(агригацией данных должен заниматься бэкенд) и тогда бы мне не пришлось делать промежуточное хранилище */

  const onChangeFilter = (event) => {
    const { value } = event.target;

    const element = document.getElementById("list_tasks");

    let newState;

    if (value === "All") {
      newState = intermediateData;
    }

    if (value === "Completed") {
      newState = intermediateData.filter((item) => item?.completed);
    }

    if (value === "NotCompleted") {
      newState = intermediateData.filter((item) => !item?.completed);
    }

    element.scrollTo(0, 0);
    setFilter(value);
    setTaskItems(newState);
  };

  const openDialogAdd = () => {
    setOpenAdd(true);
  };

  return (
    <div>
      <h1 className={classes.title}>TODO List</h1>

      <div className={classes.actions}>
        <div>
          <IconButton onClick={openDialogAdd}>
            <Add />
          </IconButton>
        </div>

        <div>
          <TextField
            label="Фильтр"
            value={filter}
            onChange={onChangeFilter}
            select
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem key="All" value="All">
              Все
            </MenuItem>
            <MenuItem key="Completed" value="Completed">
              Выполненные
            </MenuItem>
            <MenuItem key="NotCompleted" value="NotCompleted">
              Не выполненные
            </MenuItem>
          </TextField>
        </div>
      </div>

      <div className={classes.line}>
        <Divider />
      </div>

      <div>{loading && <LinearProgress />}</div>
      <div id="list_tasks" className={classes.list}>
        <List>{listItems}</List>
      </div>

      {openAdd && <AddTask open={openAdd} setOpen={setOpenAdd} />}
    </div>
  );
};

export default Tasks;
