import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBudgetCategories} from "../../../redux/budgetSlice";

export default function BudgetCategory({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_budget' : `/edit_budget/${id}`;

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.budget.categories);

    useEffect(() => {
        dispatch(setBudgetCategories(initialValue));
    }, [initialValue]);

    const handleCategoriesClick = () => {
        navigate('/budgets/categories', { state: { categories: categories, from: navigateTo, selectedCategory: categories } });
    };

    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleCategoriesClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/0/1048.9-discount-tag-ii-icon-iconbunny.jpg" alt="Category" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Category
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${categories ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {categories && categories.length > 0 ? categories.length : "Select"}
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