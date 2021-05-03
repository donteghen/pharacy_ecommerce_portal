import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import 'materialize-css/dist/css/materialize.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
