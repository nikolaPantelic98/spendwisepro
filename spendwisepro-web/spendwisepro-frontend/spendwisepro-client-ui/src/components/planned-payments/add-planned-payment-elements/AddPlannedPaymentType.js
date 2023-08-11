import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function AddPlannedPaymentType({ onChange }) {

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
        onChange(selectedPaymentType);
    };
    const handlePaymentTypeChange = (value) => {
        setSelectedPaymentType(value);
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenPaymentType}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
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
                <DialogHeader>Payment type</DialogHeader>
                <DialogBody>
                    <Select
                        label="Payment type"
                        color="green"
                        size="lg"
                        value={tempSelectedPaymentType}
                        onChange={handlePaymentTypeChange}
                        className="relative"
                    >
                        <Option value="Cash">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1028/1028137.png" alt="Cash" />
                                <span className="ml-3">Cash</span>
                            </div>
                        </Option>
                        <Option value="Credit Card">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://www.pngitem.com/pimgs/m/544-5444157_credit-card-icons-png-credit-card-icon-green.png" alt="Credit Card" />
                                <span className="ml-3">Credit Card</span>
                            </div>
                        </Option>
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
    );
}