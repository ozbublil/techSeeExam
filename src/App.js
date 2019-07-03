import React from 'react';
import logo from './cockroach.svg';
import './App.css';
import SearchBugs from './components/searchBugs/searchBugs'

const App = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <h1 className="label">
            Search Bugs
          </h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <SearchBugs />
      </header>
    </div>
  );
}

export default App;
