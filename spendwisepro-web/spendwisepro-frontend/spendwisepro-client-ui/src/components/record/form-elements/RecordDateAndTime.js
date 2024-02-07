import {
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRecordDateAndTime} from "../../../redux/recordSlice";

export default function RecordDateAndTime({ initialValue = "", formType, id }) {

    const navigate = useNavigate();
    const navigateTo = formType === 'add' ? '/add_record' : `/edit_record/${id}`;

    const dispatch = useDispatch();
    const dateAndTime = useSelector((state) => state.record.dateAndTime);
    const selectedTab = useSelector((state) => state.record.selectedTab);

    useEffect(() => {
        dispatch(setRecordDateAndTime(initialValue));
    }, [initialValue]);

    const handleDateAndTimeClick = () => {
        navigate('/records/date_and_time', { state: { dateAndTime: dateAndTime, from: navigateTo, selectedTab: selectedTab } });
    };

    const formatDateTime = (dateTime) => {
        const parsedDateTime = new Date(dateTime);
        return parsedDateTime
                .getDate()
                .toString()
                .padStart(2, '0') +
            '/' +
            (parsedDateTime.getMonth() + 1).toString().padStart(2, '0') +
            '/' +
            parsedDateTime.getFullYear() +
            ' ' +
            parsedDateTime.getHours().toString().padStart(2, '0') +
            ':' +
            parsedDateTime.getMinutes().toString().padStart(2, '0');
    };


    return (
        <li className="py-3 sm:py-4">
            <div>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                          onClick={handleDateAndTimeClick}>
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn1.iconfinder.com/data/icons/ui-5/502/calendar-512.png" alt="Date and time" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Date and time
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${dateAndTime ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {dateAndTime ? formatDateTime(dateAndTime) : 'Select'}
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