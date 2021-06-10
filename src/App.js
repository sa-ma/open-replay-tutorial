import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Tracker from '@asayerio/tracker';

const tracker = new Tracker({
  projectID: 8794100460112674,
});

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    tracker.start();
  }, []);
  const increment = () => setCount((prevState) => (prevState += 1));
  const decrement = () => setCount((prevState) => (prevState -= 1));
  console.log(count);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div className="counter">
        <button className="btn" type="button" onClick={() => decrement()}>
          -
        </button>
        <p className="count">{count}</p>
        <button className="btn" type="button" onClick={() => increment()}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
