import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
// import * as serviceWorker from './serviceWorker';

import './css/index.css';
import App from './views/App';
import IssuePengurus from './views/IssuePengurus';
import Register from './views/Register';
import Secret from './views/Secret';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <BrowserRouter>
        <Switch>

            <Route path="/" exact render={props => <App {...props} />}/>
            <Route path='/list' component={() => {
                // window.location.href = 'https://bit.ly/list-presensi-hmif';
                window.open(
                    'https://bit.ly/list-presensi-hmif',
                    '_blank' // <- This is what makes it open in a new window.
                );
                return null;
            }}/>
            <Route path="/presensi" exact render={props => <App {...props} />}/>
            <Route path="/register" exact render={props => <Register {...props} />}/>
            <Route path="/issue" exact render={props => <IssuePengurus {...props} />}/>
            <Route path="/secret" exact render={props => <Secret {...props} />}/>
            {/*<Redirect to="/login"/>*/}

        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
