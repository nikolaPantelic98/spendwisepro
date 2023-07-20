import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import AddCategory from "./AddCategory";
import Categories from "./Categories";
import AddRecord from "./AddRecord";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home" element={<Home />}></Route>

                    <Route path="/add_category" element={<AddCategory />}></Route>
                    <Route path="/categories" element={<Categories />}></Route>

                    <Route path="/add_record" element={<AddRecord />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;