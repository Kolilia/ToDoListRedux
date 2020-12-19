import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchTasks() {
  try {
    yield put({ type: "CHANGE_LOADING", payload: true });

    const { data } = yield axios.get(
      "https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks"
    );

    yield put({ type: "FETCH_TASKS_FINISH", payload: data });

    yield put({ type: "CHANGE_LOADING", payload: false });
  } catch (err) {
    console.log(err);

    yield put({ type: "CHANGE_LOADING", payload: false });
  }
}

function* changeTask(action) {
  try {
    yield put({ type: "CHANGE_LOADING", payload: true });

    const payload = { ...action.payload };

    delete payload.id;

    yield axios.put(
      `https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks/${action.payload.id}`,
      payload
    );

    yield put({ type: "FETCH_TASKS" });

    yield put({ type: "CHANGE_LOADING", payload: false });
  } catch (err) {
    console.log(err);

    yield put({ type: "CHANGE_LOADING", payload: false });
  }
}

function* addTask(action) {
  try {
    yield put({ type: "CHANGE_LOADING", payload: true });

    const payload = { ...action.payload };

    yield axios.post(
      `https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks`,
      payload
    );

    yield put({ type: "FETCH_TASKS" });

    yield put({ type: "CHANGE_LOADING", payload: false });
  } catch (err) {
    console.log(err);

    yield put({ type: "CHANGE_LOADING", payload: false });
  }
}

function* deleteTask(action) {
  try {
    yield put({ type: "CHANGE_LOADING", payload: true });

    yield axios.delete(
      `https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks/${action?.payload}`
    );

    yield put({ type: "FETCH_TASKS" });

    yield put({ type: "CHANGE_LOADING", payload: false });
  } catch (err) {
    console.log(err);

    yield put({ type: "CHANGE_LOADING", payload: false });
  }
}

export default function* sagaTasks() {
  yield takeEvery("FETCH_TASKS", fetchTasks);
  yield takeEvery("CHANGE_TASK", changeTask);
  yield takeEvery("ADD_TASK", addTask);
  yield takeEvery("DELETE_TASK", deleteTask);
}
