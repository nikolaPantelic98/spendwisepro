import {
    Button,
    Card,
    CardBody,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    ListItem,
    Option,
    Select
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function AddRecordExpense() {

    // amount

    const [openAmount, setOpenAmount] = React.useState(false);
    const [amountValue, setAmountValue] = React.useState("");
    const [isAmountTyped, setIsAmountTyped] = React.useState(false);
    const [tempAmountValue, setTempAmountValue] = React.useState("");
    const handleOpenAmount = () => {
        setTempAmountValue(amountValue);
        setOpenAmount(true);
    };
    const handleCloseAmount = () => {
        if (isAmountTyped) {
            setAmountValue(tempAmountValue);
        }
        setOpenAmount(false);
    };
    const handleConfirmAmount = () => {
        if (!isAmountTyped) {
            setTempAmountValue("");
            setIsAmountTyped(false);
        }
        setOpenAmount(false);
    };
    const handleAmountChange = (event) => {
        setAmountValue(event.target.value);
        setIsAmountTyped(event.target.value !== "");
    }

    // category

    const [openCategory, setOpenCategory] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [tempSelectedCategory, setTempSelectedCategory] = React.useState("");
    const handleOpenCategory = () => {
        setTempSelectedCategory(selectedCategory);
        setOpenCategory(true);
    };
    const handleCloseCategory = () => {
        setSelectedCategory(tempSelectedCategory);
        setOpenCategory(false);
    };

    const handleConfirmCategory = () => {
        setOpenCategory(false);
        setTempSelectedCategory("");
    };
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    // payment type

    const [openPaymentType, setOpenPaymentType] = React.useState(false);
    const [selectedPaymentType, setSelectedPaymentType] = React.useState("");
    const [tempSelectedPaymentType, setTempSelectedPaymentType] = React.useState("");
    const handleOpenPaymentType = () => {
        setTempSelectedPaymentType(selectedPaymentType);
        setOpenPaymentType(true);
    };
    const handleClosePaymentType = () => {
        setSelectedPaymentType(tempSelectedPaymentType);
        setOpenPaymentType(false);
    };

    const handleConfirmPaymentType = () => {
        setOpenPaymentType(false);
        setTempSelectedPaymentType("");
    };
    const handlePaymentTypeChange = (value) => {
        setSelectedPaymentType(value);
    }

    // date and time

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

    // notes

    const [openNote, setOpenNote] = React.useState(false);
    const [contentNote, setContentNote] = React.useState("");
    const [isNoteTyped, setIsNoteTyped] = React.useState(false);
    const [tempNoteContent, setTempANoteContent] = React.useState("");
    const handleOpenNote = () => {
        setTempANoteContent(contentNote);
        setOpenNote(true);
    };
    const handleCloseNote = () => {
        if (isNoteTyped) {
            setContentNote(tempNoteContent);
        }
        setOpenNote(false);
    };
    const handleConfirmNote = () => {
        if (!isNoteTyped) {
            setTempANoteContent("");
            setIsNoteTyped(false);
        }
        setOpenNote(false);
    };
    const handleNoteChange = (event) => {
        setContentNote(event.target.value);
        setIsNoteTyped(event.target.value !== "");
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        <li className="py-3 sm:py-4">
                            <div onClick={handleOpenAmount}>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/189/189715.png" alt="Electricity bills" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Amount
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isAmountTyped ? 'font-bold text-gray-900' : ''}`}>
                                            {amountValue ? `$${parseFloat(amountValue).toFixed(2)}` : "Type"}
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </div>
                            <Dialog
                                open={openAmount}
                                handler={handleOpenAmount}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>Amount</DialogHeader>
                                <DialogBody>
                                    <Input label="Amount" color="green" type="number" step="0.01" inputMode="decimal" pattern="[0-9]*" value={amountValue} onChange={handleAmountChange} />
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleCloseAmount}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="green" onClick={handleConfirmAmount}>
                                        <span>Confirm</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div onClick={handleOpenCategory}>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/107/107073.png" alt="Chips" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Category
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className={`text-sm truncate dark:text-gray-400 ${selectedCategory ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                                            {selectedCategory || "Select"}
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </div>
                            <Dialog
                                open={openCategory}
                                handler={handleOpenCategory}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>Category</DialogHeader>
                                <DialogBody>
                                    <Select
                                        label="Category"
                                        menuProps={{ className: "h-48" }}
                                        color="green"
                                        value={tempSelectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        <Option value="Grocery">Grocery</Option>
                                        <Option value="Fuel">Fuel</Option>
                                        <Option value="Phone">Phone</Option>
                                        <Option value="Snacks">Snacks</Option>
                                        <Option value="Tax">Tax</Option>
                                    </Select>
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleCloseCategory}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="green" onClick={handleConfirmCategory}>
                                        <span>Confirm</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div onClick={handleOpenPaymentType}>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Circle-icons-creditcard.svg/480px-Circle-icons-creditcard.svg.png" alt="Phone bills" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Payment type
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className={`text-sm truncate dark:text-gray-400 ${selectedPaymentType ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                                            {selectedPaymentType || "Select"}
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </div>
                            <Dialog
                                open={openPaymentType}
                                handler={handleOpenPaymentType}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>Category</DialogHeader>
                                <DialogBody>
                                    <Select
                                        label="Category"
                                        color="green"
                                        value={tempSelectedPaymentType}
                                        onChange={handlePaymentTypeChange}
                                    >
                                        <Option value="Cash">Cash</Option>
                                        <Option value="Credit Card">Credit Card</Option>
                                    </Select>
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleClosePaymentType}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="green" onClick={handleConfirmPaymentType}>
                                        <span>Confirm</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div onClick={handleOpenDateTime}>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn1.iconfinder.com/data/icons/ui-5/502/calendar-512.png" alt="Phone bills" />
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

                        <li className="py-3 sm:py-4">
                            <div onClick={handleOpenNote}>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/190/190703.png" alt="Phone bills" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Note
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-4"></div>
                                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isNoteTyped ? 'font-bold text-gray-500 truncate' : ''}`}>
                                            {contentNote ? contentNote : "Type"}
                                        </div>
                                        <div className="h-4"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                            </div>
                            <Dialog
                                open={openNote}
                                handler={handleOpenNote}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>Amount</DialogHeader>
                                <DialogBody>
                                    <Input label="Note" color="green" value={contentNote} onChange={handleNoteChange} />
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleCloseNote}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="green" onClick={handleConfirmNote}>
                                        <span>Confirm</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </li>

                    </ul>
                    <hr className="my-2 border-blue-gray-50" />
                    <div className="flex justify-center items-center">
                        <Button className="mt-2 w-full" variant="gradient" color="green" onClick={handleConfirmNote}>
                            <span>Save</span>
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}