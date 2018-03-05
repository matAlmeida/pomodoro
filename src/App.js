// Modules
import React, { Component } from 'react';

// Material Ui
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import SettingsIcon from 'material-ui-icons/Settings';
import Modal from 'material-ui/Modal';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

// Components
import Countdown from './Countdown';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  flex: {
    flex: 1
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: [1800, 900, 300],
      newTimer: [30, 15, 5],
      currentTimer: 0,
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
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

  openModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  handleChange = (idx) => (event) => {
    this.setState({
      newTimer: this.state.newTimer.reduce((agg, val, index) => {
        if (index === idx) return agg.concat(event.target.value);
        else return agg.concat(val);
      }, [])
    });
  };

  changeTimer() {
    this.setState({ timer: this.state.newTimer.map((val) => val * 60) });
    this.closeModal();
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <div>
              <IconButton
                style={{
                  marginLeft: -12,
                  marginRight: 20
                }}
                color="inherit"
                aria-label="Settings"
                onClick={this.openModal.bind(this)}
              >
                <SettingsIcon />
              </IconButton>
              <Modal
                open={this.state.modal}
                onBackdropClick={this.closeModal.bind(this)}
                onEscapeKeyDown={this.closeModal.bind(this)}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Paper elevation={4} style={{ padding: 30, borderRadius: 10 }}>
                  <Typography variant="headline" component="h3">
                    Pomodoro Settings
                  </Typography>
                  <Typography component="p">
                    Change how your Pomodoro Timer will work
                  </Typography>
                  <div style={{ marginTop: 20 }}>
                    <FormControl aria-describedby="weight-helper-text">
                      <Input
                        id="adornment-weight"
                        value={this.state.newTimer[0]}
                        onChange={this.handleChange(0)}
                        endAdornment={
                          <InputAdornment position="end">
                            minutes
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id="weight-helper-text">
                        Pomodoro
                      </FormHelperText>
                    </FormControl>
                    <br />
                    <FormControl aria-describedby="weight-helper-text">
                      <Input
                        id="adornment-weight"
                        value={this.state.newTimer[1]}
                        onChange={this.handleChange(1)}
                        endAdornment={
                          <InputAdornment position="end">
                            minutes
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id="weight-helper-text">
                        Long Break
                      </FormHelperText>
                    </FormControl>
                    <br />
                    <FormControl aria-describedby="weight-helper-text">
                      <Input
                        id="adornment-weight"
                        value={this.state.newTimer[2]}
                        onChange={this.handleChange(2)}
                        endAdornment={
                          <InputAdornment position="end">
                            minutes
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id="weight-helper-text">
                        Short Break
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <Button
                    onClick={this.changeTimer.bind(this)}
                    variant="raised"
                    color="primary"
                  >
                    Save
                  </Button>
                </Paper>
              </Modal>
            </div>
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
