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

export default function AddGoalStartDate() {

    const [openStartDate, setOpenStartDate] = React.useState(false);
    const [selectedStartDate, setSelectedStartDate] = React.useState("");
    const [tempSelectedStartDate, setTempSelectedStartDate] = React.useState("");
    const [isStartDateSelected, setIsStartDateSelected] = React.useState(false);

    const handleOpenStartDate = () => {
        setTempSelectedStartDate(isStartDateSelected ? selectedStartDate : "");
        setOpenStartDate(true);
    };

    const handleCloseStartDate = () => {
        setOpenStartDate(false);
    };

    const handleConfirmStartDate = () => {
        setSelectedStartDate(tempSelectedStartDate);
        setOpenStartDate(false);
        setIsStartDateSelected(true);
    };
    const handleStartDateChange = (event) => {
        setTempSelectedStartDate(event.target.value);
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
            <div onClick={handleOpenStartDate}>
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
                        <div className={`text-sm truncate dark:text-gray-400 ${isStartDateSelected ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {isStartDateSelected ? formatDate(selectedStartDate) : 'Select'}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openStartDate}
                handler={handleOpenStartDate}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Start Date</DialogHeader>
                <DialogBody>
                    <Input label="Start Date" color="green" type="date" value={tempSelectedStartDate} onChange={handleStartDateChange} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseStartDate}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmStartDate}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}