import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBudgetName} from "../../../redux/budgetSlice";

export default function BudgetName({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_budget' : `/edit_budget/${id}`;

    const dispatch = useDispatch();
    const name = useSelector((state) => state.budget.name);

    useEffect(() => {
        dispatch(setBudgetName(initialValue));
    }, [initialValue]);

    const handleNameClick = () => {
        navigate('/budgets/name', { state: { name: name, from: navigateTo } });
    };


    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleNameClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/4/0/4039.9-documents-and-pen-icon-iconbunny.jpg" alt="Name" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Name
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${initialValue !== "" ? 'font-bold text-gray-500 truncate' : ''}`}>
                            {name ? (name.length > 20 ? name.substring(0, 17) + "..." : name) : "Type"}
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