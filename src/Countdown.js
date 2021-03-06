import React from 'react';
import Button from 'material-ui/Button';
import sound from './egg-timer-sound.mp3';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: this.props.seconds };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timerSound = new Audio(sound);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidUpdate() {
    document.title =
      '(' +
      (this.state.time.m < 10 ? '0' + this.state.time.m : this.state.time.m) +
      ':' +
      (this.state.time.s < 10 ? '0' + this.state.time.s : this.state.time.s) +
      ') | Pomodoro Timer';
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  restartTimer() {
    this.stopTimer();
    let seconds = this.props.seconds;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    // this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.timerSound.play();
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        {this.state.time.m < 10 ? '0' + this.state.time.m : this.state.time.m}:{this
          .state.time.s < 10
          ? '0' + this.state.time.s
          : this.state.time.s}
        <div>
          <Button onClick={this.startTimer} color="primary">
            Start
          </Button>
          <Button onClick={this.stopTimer} color="secondary">
            Stop
          </Button>
          <Button onClick={this.restartTimer}>Restart</Button>
        </div>
      </div>
    );
  }
}

export default Countdown;
