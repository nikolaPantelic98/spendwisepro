import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRecordPaymentType} from "../../../redux/recordSlice";

export default function RecordPaymentType({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_record' : `/edit_record/${id}`;

    const dispatch = useDispatch();
    const paymentType = useSelector((state) => state.record.paymentType);
    const selectedTab = useSelector((state) => state.record.selectedTab);

    useEffect(() => {
        dispatch(setRecordPaymentType(initialValue));
    }, [initialValue]);

    const handlePaymentTypeClick = () => {
        navigate('/records/payment_type', { state: { paymentType: paymentType, from: navigateTo, selectedTab: selectedTab } });
    };

    function getPaymentType(paymentType) {
        if (paymentType === "CREDIT_CARD") {
            return "Credit Card";
        } else if (paymentType === "CASH") {
            return "Cash";
        }
    }

    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handlePaymentTypeClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/314/314420.png" alt="Payment type" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Payment type
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${paymentType ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {getPaymentType(paymentType) || "Select"}
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