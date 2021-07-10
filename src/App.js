import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Tracker from '@openreplay/tracker';

const tracker = new Tracker({
  projectKey: 'e5GhEq11jVND65KFNVmQ',
  ingestPoint: 'https://app.openreplaytutorial.ga/ingest',
});
tracker.start();

function App() {
  const [count, setCount] = useState(0);
  const increment = () => {
    if (count % 5 === 0 && count !== 0) {
      throw 'Custom error triggered, count a multiple of 5';
    }
    setCount((prevState) => (prevState += 1));
  };
  const decrement = () => setCount((prevState) => (prevState -= 1));

  const handleServerError = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (tracker && tracker.getSessionToken()) {
      headers['X-Session-Id'] = tracker.getSessionToken(); // Inject openreplay_session_id
    }
    fetch('https://openreplay-backend.herokuapp.com/error', {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
        throw 'Custom error triggered, server error';
      });
  };

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
      <button className="btn" type="button" onClick={() => handleServerError()}>
        Handle Server Error
      </button>
    </div>
  );
}

export default App;
