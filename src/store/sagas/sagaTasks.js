import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchTasks() {
  try {
    yield put({ type: "CHANGE_LOADING", payload: { loading: true } });
    const { data } = yield axios.get(
      "https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks"
    );

    yield put({ type: "FETCH_TASKS_FINISH", payload: data });

    yield put({ type: "CHANGE_LOADING", payload: { loading: false } });
  } catch (err) {
    console.log(err);

    yield put({ type: "CHANGE_LOADING", payload: { loading: false } });
  }
}

export function* sagaTasks() {
  yield takeEvery("FETCH_TASKS", fetchTasks);
}
