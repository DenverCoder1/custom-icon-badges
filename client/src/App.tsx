import React from 'react';
import './App.scss';
import FileUpload from './FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Custom Icon Badges</h1>
        <FileUpload/>
        <a
          className="App-link"
          href="https://github.com/DenverCoder1/custom-icon-badges"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>
    </div>
  );
}

export default App;
