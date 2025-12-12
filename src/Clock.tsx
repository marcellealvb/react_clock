import React from 'react';

type Props = {
  name: string;
};

type State = {
  today: Date;
  hasClock: boolean;
};

export class Clock extends React.PureComponent<Props, State> {
  state: State = {
    today: new Date(),
    hasClock: true,
  };

  timerId = 0;

  today = new Date();

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true });
  };

  componentDidMount(): void {
    // This code starts a timer
    this.timerId = window.setInterval(() => {
      const now = new Date();

      this.setState({ today: now });

      if (this.state.hasClock) {
        // eslint-disable-next-line no-console
        console.log('Curent time: ', now.toUTCString().slice(-12, -4));
      }
    }, 1000);

    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.name !== this.props.name) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  componentWillUnmount(): void {
    // this code stops the timer
    window.clearInterval(this.timerId);

    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  render() {
    if (!this.state.hasClock) {
      return null;
    }

    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    )
  }
}
