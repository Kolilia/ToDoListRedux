import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import tasks from "./reducers/tasks";
import sagaTask from "./sagas/sagaTasks";

export const allReducers = combineReducers({
  tasks: tasks,
});

export function* allSagas() {
  yield all([fork(sagaTask)]);
}
