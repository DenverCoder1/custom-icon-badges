import React from 'react';
import './App.scss';
import UploadForm from './UploadForm';
import GitHubButtons from './GitHubButtons';

/**
 * The root component of the application
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Custom Icon Badges</h1>
        <GitHubButtons user="DenverCoder1" repo="custom-icon-badges" />
        <UploadForm />
      </header>
    </div>
  );
}

export default App;
