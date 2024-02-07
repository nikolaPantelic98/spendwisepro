import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRecordCategory} from "../../../redux/recordSlice";

export default function RecordCategory({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_record' : `/edit_record/${id}`;

    const dispatch = useDispatch();
    const category = useSelector((state) => state.record.category);
    const selectedTab = useSelector((state) => state.record.selectedTab);

    useEffect(() => {
        dispatch(setRecordCategory(initialValue));
    }, [initialValue]);

    const handleCategoryClick = () => {
        navigate('/records/category', { state: { category: category, from: navigateTo, selectedCategory: category, selectedTab: selectedTab } });
    };


    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleCategoryClick}>
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
                        <div className={`text-sm truncate dark:text-gray-400 ${category ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {category ? (category.name.length > 14 ? category.name.substring(0, 11) + "..." : category.name) : "Select"}
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