import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRecordTransactionType} from "../../../redux/recordSlice";

export default function RecordTransactionType({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_record' : `/edit_record/${id}`;

    const dispatch = useDispatch();
    const transactionType = useSelector((state) => state.record.transactionType);
    const selectedTab = useSelector((state) => state.record.selectedTab);

    useEffect(() => {
        dispatch(setRecordTransactionType(initialValue));
    }, [initialValue]);

    const handleTransactionTypeClick = () => {
        navigate('/records/transaction_type', { state: { transactionType: transactionType, from: navigateTo, selectedTab: selectedTab } });
    };

    function getTransactionType(transactionType) {
        if (transactionType === "EXPENSE") {
            return "Expense";
        } else if (transactionType === "INCOME") {
            return "Income";
        }
    }

    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleTransactionTypeClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.freepik.com/512/6439/6439615.png" alt="Transaction type" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Transaction type
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${transactionType ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {getTransactionType(transactionType) || "Select"}
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