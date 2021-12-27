import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';

var rootStyle = {
  height : '100vh',

}

ReactDOM.render(
  <div style={rootStyle}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </div>,
  document.getElementById('root')
);


reportWebVitals();
