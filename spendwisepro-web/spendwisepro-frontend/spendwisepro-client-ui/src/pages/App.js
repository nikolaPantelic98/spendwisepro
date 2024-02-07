import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from '../redux/store';
import ScrollToTop from "../components/common/ScrollToTop";
import AnimatedRoutes from "../components/common/AnimatedRoutes";

function App() {

    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <AnimatedRoutes />
                    <ScrollToTop />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;