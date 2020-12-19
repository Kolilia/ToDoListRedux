import { Container, LinearProgress, Paper } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

/* Роутинг не имеет смысла отдельно выносить, у нас всего два роута */

const Tasks = lazy(function () {
  return import("../Tasks");
});

const Task = lazy(function () {
  return import("../DetailTask");
});

const App = () => (
  <Container maxWidth="sm">
    <Paper>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route component={Task} path="/:id" />
          <Route component={Tasks} path="/" />
        </Switch>
      </Suspense>
    </Paper>
  </Container>
);

export default App;
