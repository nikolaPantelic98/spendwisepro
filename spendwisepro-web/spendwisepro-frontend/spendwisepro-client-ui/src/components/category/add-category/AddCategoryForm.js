import {
    Card,
    CardBody,
    Button
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import CategoryName from "../form-elements/CategoryName";
import CategoryParentCategory from "../form-elements/CategoryParentCategory";
import CategoryIcon from "../form-elements/CategoryIcon";
import CategoryColor from "../form-elements/CategoryColor";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useReduxReset} from "../../../redux/useReduxReset";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryColor, setCategoryIcon, setCategoryName, setCategoryParent} from "../../../redux/categorySlice";

export default function AddCategoryForm() {

    const reduxReset = useReduxReset();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const { name, color, icon, parent } = category;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleNameChange = (name) => {
        dispatch(setCategoryName(name));
    };

    const handleColorChange = (color) => {
        dispatch(setCategoryColor(color));
    };

    const handleIconChange = (icon) => {
        dispatch(setCategoryIcon(icon));
    };

    const handleParentChange = (parent) => {
        dispatch(setCategoryParent(parent));
    };

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/categories/save", category, { headers });
            reduxReset();
            navigate("/categories", {state: {addSuccess: true}});
        } catch (err) {
            console.log("error");
        }
    }

    const updatedName = useSelector((state) => state.category.name);
    const updatedColor = useSelector((state) => state.category.color);
    const updatedIcon = useSelector((state) => state.category.icon);
    const updatedParent = useSelector((state) => state.category.parent);

    useEffect(() => {
        if (updatedName) {
            handleNameChange(updatedName);
        } else if (updatedColor) {
            handleColorChange(updatedColor);
        } else if (updatedIcon) {
            handleIconChange(updatedIcon);
        } else if (updatedParent) {
            handleParentChange(updatedParent);
        }
    }, [updatedName, updatedColor, updatedIcon, updatedParent]);


    return (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <CategoryName setCategoryName={handleNameChange} initialValue={name} formType="add" />

                            <CategoryParentCategory setCategoryParent={handleParentChange} initialValue={parent} formType="add" />

                            <CategoryIcon setCategoryIcon={handleIconChange} initialValue={icon} formType="add" />

                            <CategoryColor setCategoryColor={handleColorChange} initialValue={color} formType="add" />
                        </ul>
                        <hr className="my-2 border-blue-gray-50" />
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Add</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}