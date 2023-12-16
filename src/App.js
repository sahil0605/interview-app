// src/App.js
import React from 'react';
import InterviewTable from './components/InterviewTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interview Feedback App</h1>
      </header>
      <main>
        <InterviewTable />
      </main>
    </div>
  );
}

export default App;
