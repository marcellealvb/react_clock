import './App.scss';
import { Clock } from './Clock';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1>React clock</h1>
      <Clock name={'clock-0'} />
    </div>
  );
};
