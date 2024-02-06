import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBudgetPeriod} from "../../../redux/budgetSlice";

export default function BudgetPeriod({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_budget' : `/edit_budget/${id}`;

    const dispatch = useDispatch();
    const period = useSelector((state) => state.budget.period);

    useEffect(() => {
        dispatch(setBudgetPeriod(initialValue));
    }, [initialValue]);

    const handlePeriodClick = () => {
        navigate('/budgets/period', { state: { period: period, from: navigateTo } });
    };

    function getPeriod(period) {
        if (period === "WEEKLY") {
            return "Weekly";
        } else if (period === "MONTHLY") {
            return "Monthly";
        }
    }

    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handlePeriodClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/327/327857.png" alt="Interval" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Period
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${period ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {getPeriod(period) || "Select"}
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