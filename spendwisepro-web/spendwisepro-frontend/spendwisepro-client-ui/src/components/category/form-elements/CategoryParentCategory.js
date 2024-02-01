import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select, Typography
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryIcon, setCategoryParent} from "../../../redux/categorySlice";

export default function CategoryParentCategory({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_category' : `/edit_category/${id}`;

    const dispatch = useDispatch();
    const parent = useSelector((state) => state.category.parent);

    useEffect(() => {
        dispatch(setCategoryParent(initialValue));
    }, [initialValue]);

    function findParentImage(icon) {
        return parent.icon.iconPath;
    }

    const handleParentClick = () => {
        navigate('/categories/parent', { state: { parent: parent, from: navigateTo, selectedParent: parent } });
    };


    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleParentClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/icon-categories/icon-categories-0.jpg" alt="Parent category" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Parent Category
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${parent ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {parent ? (parent.name.length > 14 ? parent.name.substring(0, 11) + "..." : parent.name) : "Select"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
        </li>
    );
}