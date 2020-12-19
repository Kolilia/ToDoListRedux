import { Button, Container, Paper } from "@material-ui/core";
import React from "react";

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Paper>
          <Container maxWidth0="xs">
            <h2>Внимание вышла новая версия сайта!</h2>
            <p>
              Внимание! Наш сайт был обновлен. Пожалуйста,перезагрузите страницу
            </p>

            <div style={{ marginTop: "2rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={function () {
                  window.location.reload();
                }}
                fullWidth
              >
                Reload page{" "}
              </Button>
            </div>
          </Container>
        </Paper>
      );
    }
    return this.props.children;
  }
}

export default ErrorHandler;
