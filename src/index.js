import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {GlobalStyle, lightTheme} from "./style";
import {ThemeProvider} from "styled-components";
import {StateProvider} from "./HOCs/StateProvider";
import reducer, {initialState} from "./store";

ReactDOM.render(
    <React.Fragment>
        <StateProvider initialState={initialState} reducer={reducer}>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle/>
                <App/>
            </ThemeProvider>
        </StateProvider>
    </React.Fragment>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
