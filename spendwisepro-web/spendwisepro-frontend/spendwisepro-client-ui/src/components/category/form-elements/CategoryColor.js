import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryColor} from "../../../redux/categorySlice";

export default function CategoryColor({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_category' : `/edit_category/${id}`;

    const dispatch = useDispatch();
    const color = useSelector((state) => state.category.color);

    useEffect(() => {
        dispatch(setCategoryColor(initialValue));
    }, [initialValue]);

    function findColorImage(color) {
        return color.image;
    }

    const handleColorClick = () => {
        navigate('/categories/color', { state: { color: color, from: navigateTo, selectedColor: color } });
    };


    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleColorClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/mFCpZXC/paint-palette.png" alt="Color"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Color
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-3"></div>
                        <div
                            className={`text-sm truncate dark:text-gray-400 ${
                                color
                                    ? "font-bold text-gray-500"
                                    : "text-gray-500"
                            }`}
                        >
                            {color ? (
                                <img
                                    className="w-8 h-8 inline-block"
                                    src={findColorImage(color)}
                                    alt="Selected Color"
                                />
                            ) : (
                                "Select"
                            )}
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