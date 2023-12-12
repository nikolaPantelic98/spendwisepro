import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function PlannedPaymentDate() {

    const [openDate, setOpenDate] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState("");
    const [tempSelectedDate, setTempSelectedDate] = React.useState("");
    const [isDateSelected, setIsDateSelected] = React.useState(false);

    const handleOpenDate = () => {
        setTempSelectedDate(isDateSelected ? selectedDate : "");
        setOpenDate(true);
    };

    const handleCloseDate = () => {
        setOpenDate(false);
    };

    const handleConfirmDate = () => {
        setSelectedDate(tempSelectedDate);
        setOpenDate(false);
        setIsDateSelected(true);
    };
    const handleDateChange = (event) => {
        setTempSelectedDate(event.target.value);
    }

    const formatDate = (date) => {
        const parsedDateTime = new Date(date);
        return parsedDateTime
                .getDate()
                .toString()
                .padStart(2, '0') +
            '/' +
            (parsedDateTime.getMonth() + 1).toString().padStart(2, '0') +
            '/' +
            parsedDateTime.getFullYear();
    };

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenDate}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn1.iconfinder.com/data/icons/ui-5/502/calendar-512.png" alt="Date and time" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Start Date
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${isDateSelected ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {isDateSelected ? formatDate(selectedDate) : 'Select'}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openDate}
                handler={handleOpenDate}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Start Date</DialogHeader>
                <DialogBody>
                    <Input label="Start Date" color="green" type="date" value={tempSelectedDate} onChange={handleDateChange} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseDate}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmDate}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}