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

    const colorImages = {
        "blue-gray": "https://i.ibb.co/KxFFbSz/blue-gray.png",
        "gray": "https://i.ibb.co/p2zphsf/gray.png",
        "brown": "https://i.ibb.co/tZnGD2d/brown.png",
        "deep-orange": "https://i.ibb.co/3Chy0PT/deep-orange.png",
        "orange": "https://i.ibb.co/9vgqFdS/orange.png",
        "amber": "https://i.ibb.co/yQ2sQv8/amber.png",
        "yellow": "https://i.ibb.co/xL8Hk2t/yellow.png",
        "lime": "https://i.ibb.co/KzM5dBY/lime.png",
        "light-green": "https://i.ibb.co/CtHgJqc/light-green.png",
        "green": "https://i.ibb.co/pJDFFbr/green.png",
        "teal": "https://i.ibb.co/4pc1szg/teal.png",
        "cyan": "https://i.ibb.co/TtJGdmp/cyan.png",
        "light-blue": "https://i.ibb.co/hFgDjbY/light-blue.png",
        "blue": "https://i.ibb.co/Q6LzwQF/blue.png",
        "indigo": "https://i.ibb.co/89NTH46/indigo.png",
        "deep-purple": "https://i.ibb.co/ccWzHZt/deep-purple.png",
        "purple": "https://i.ibb.co/2hcRVhs/purple.png",
        "pink": "https://i.ibb.co/CmMyFBr/pink.png",
        "red": "https://i.ibb.co/C7mNPLf/red.png"
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
                                    src={colorImages[color]}
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