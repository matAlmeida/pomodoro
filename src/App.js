import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import Countdown from './Countdown';
import './App.css';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: [1800, 900, 300],
      currentTimer: 0
    };
  }

  async pomodoro() {
    if (this.state.currentTimer !== 0) await this.setState({ currentTimer: 0 });
    this.refs.child.restartTimer();
  }

  async longBreak() {
    if (this.state.currentTimer !== 1) await this.setState({ currentTimer: 1 });
    this.refs.child.restartTimer();
  }

  async shortBreak() {
    if (this.state.currentTimer !== 2) await this.setState({ currentTimer: 2 });
    this.refs.child.restartTimer();
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Pomodoro Timer
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ marginTop: 20 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Button
                onClick={this.pomodoro.bind(this)}
                variant="raised"
                color="primary"
              >
                Pomodoro
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                onClick={this.longBreak.bind(this)}
                variant="raised"
                color="primary"
              >
                Long Break
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                onClick={this.shortBreak.bind(this)}
                variant="raised"
                color="primary"
              >
                Short Break
              </Button>
            </Grid>
          </Grid>
        </div>

        <div style={{ padding: 20 }}>
          <Paper elevation={4}>
            <Typography variant="display4" gutterBottom>
              <Countdown
                ref="child"
                seconds={this.state.timer[this.state.currentTimer]}
              />
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
