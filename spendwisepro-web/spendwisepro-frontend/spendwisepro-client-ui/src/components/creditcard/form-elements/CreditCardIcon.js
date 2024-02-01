import {
    ListItem
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setIcon} from "../../../redux/creditCardSlice";

export default function CreditCardIcon({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_credit_card' : `/edit_credit_card/${id}`;

    const dispatch = useDispatch();
    const icon = useSelector((state) => state.creditCard.icon);

    useEffect(() => {
        dispatch(setIcon(initialValue));
    }, [initialValue]);

    function findIconImage(icon) {
        return icon.iconPath;
    }

    const handleIconClick = () => {
        navigate('/credit_cards/icon', { state: { icon: icon, from: navigateTo, selectedIcon: icon } });
    };


    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleIconClick}>
                    <div className="flex-shrink-0">
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://www.seekpng.com/png/detail/764-7640973_choose-icon-touch-circle.png"
                            alt="Icon"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Icon
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div
                            className={`text-sm truncate dark:text-gray-400 ${
                                icon
                                    ? "font-bold text-gray-500"
                                    : "text-gray-500"
                            }`}
                        >
                            {icon ? (
                                <img
                                    className="w-8 h-8 inline-block"
                                    src={findIconImage(icon)}
                                    alt="Selected Icon"
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