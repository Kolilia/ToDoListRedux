import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/core";
import { create } from "jss";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import App from "./components/App";
import ErrorHandler from "./components/ErrorHandler";
import { allReducers, allSagas } from "./store";
import { theme } from "./theme";

const jss = create({
  plugins: [...jssPreset().plugins],
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

render(
  <Router>
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <ErrorHandler>
            <App />
          </ErrorHandler>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

sagaMiddleware.run(allSagas);
