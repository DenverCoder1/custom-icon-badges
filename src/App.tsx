import React from 'react';
import './App.scss';
import UploadForm from './UploadForm';
import GitHubButtons from './GitHubButtons';
import IconPreviewInterface from './IconPreviewInterface';
import { Tabs, Tab } from 'react-bootstrap';

/**
 * The root component of the application
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Custom Icon Badges</h1>
        <GitHubButtons user="DenverCoder1" repo="custom-icon-badges" />
        <Tabs defaultActiveKey="upload" id="icon-tabs" className="mb-3">
          <Tab eventKey="upload" title="Upload">
            <UploadForm />
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <IconPreviewInterface />
          </Tab>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
