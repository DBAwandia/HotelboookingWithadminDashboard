import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SearchContextProvider} from './Context/SearchContext'
import { LoginContextProvider } from './Context/LoginContext';
import { RegisterContextProvider } from './Context/RegisterContext';
import { DetailsContextProvider } from './Context/DetailsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DetailsContextProvider>
    <RegisterContextProvider>
    <LoginContextProvider>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
    </LoginContextProvider>
    </RegisterContextProvider>
    </DetailsContextProvider>
  </React.StrictMode>
);
reportWebVitals();
