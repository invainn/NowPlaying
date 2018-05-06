import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import history from './history';

import reducers from './reducers';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-rater/lib/react-rater.css';

import App from './components/App';
import Header from './components/Header';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div className="container">
                <Header />

                <Switch>
                    <Route exact path="/" component={App} />
                </Switch>
            </div>
        </Router>
    </Provider>
,document.getElementById('root'));
registerServiceWorker();
