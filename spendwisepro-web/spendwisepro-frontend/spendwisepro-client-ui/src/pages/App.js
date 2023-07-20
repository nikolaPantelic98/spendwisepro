import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import AddCategory from "./AddCategory";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home" element={<Home />}></Route>

                    <Route path="/add_category" element={<AddCategory />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;