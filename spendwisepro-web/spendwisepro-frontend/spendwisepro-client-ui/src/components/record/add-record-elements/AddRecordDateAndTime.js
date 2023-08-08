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

export default function AddRecordDateAndTime() {

    const [openDateTime, setOpenDateTime] = React.useState(false);
    const [selectedDateTime, setSelectedDateTime] = React.useState("");
    const [tempSelectedDateTime, setTempSelectedDateTime] = React.useState("");
    const [isDateTimeSelected, setIsDateTimeSelected] = React.useState(false);

    const handleOpenDateTime = () => {
        setTempSelectedDateTime(isDateTimeSelected ? selectedDateTime : "");
        setOpenDateTime(true);
    };

    const handleCloseDateTime = () => {
        setOpenDateTime(false);
    };

    const handleConfirmDateTime = () => {
        setSelectedDateTime(tempSelectedDateTime);
        setOpenDateTime(false);
        setIsDateTimeSelected(true);
    };
    const handleDateTimeChange = (event) => {
        setTempSelectedDateTime(event.target.value);
    }

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
            ', ' +
            parsedDateTime.getHours().toString().padStart(2, '0') +
            ':' +
            parsedDateTime.getMinutes().toString().padStart(2, '0');
    };

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenDateTime}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
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
                        <div className={`text-sm truncate dark:text-gray-400 ${isDateTimeSelected ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {isDateTimeSelected ? formatDateTime(selectedDateTime) : 'Select'}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openDateTime}
                handler={handleOpenDateTime}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Date and Time</DialogHeader>
                <DialogBody>
                    <Input label="Date and Time" color="green" type="datetime-local" value={tempSelectedDateTime} onChange={handleDateTimeChange} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseDateTime}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmDateTime}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}