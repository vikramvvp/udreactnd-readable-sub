import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DefaultView from './components/DefaultView';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><DefaultView /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
