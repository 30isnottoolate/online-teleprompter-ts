import React from 'react';
import ReactDOM from 'react-dom/client';
import Teleprompter from './Teleprompter';

const root = ReactDOM.createRoot(
  document.getElementById('app-container') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Teleprompter />
  </React.StrictMode>
);
