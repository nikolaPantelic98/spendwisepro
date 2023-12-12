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

export default function BudgetPeriod({ setPeriod }) {

    const [openPeriod, setOpenPeriod] = React.useState(false);
    const [selectedPeriod, setSelectedPeriod] = React.useState("");
    const [tempSelectedPeriod, setTempSelectedPeriod] = React.useState("");
    const handleOpenPeriod = () => {
        setTempSelectedPeriod(selectedPeriod);
        setOpenPeriod(true);
    };
    const handleClosePeriod = () => {
        setSelectedPeriod(null);
        setPeriod(null);
        setOpenPeriod(false);
    };

    const handleConfirmPeriod = () => {
        setPeriod(selectedPeriod);
        setOpenPeriod(false);
        setTempSelectedPeriod("");
    };
    const handlePeriodChange = (value) => {
        setSelectedPeriod(value);
    }

    function getPeriod(period) {
        if (period === "WEEKLY") {
            return "Weekly";
        } else if (period === "MONTHLY") {
            return "Monthly";
        }
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenPeriod}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
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
                        <div className={`text-sm truncate dark:text-gray-400 ${selectedPeriod ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {getPeriod(selectedPeriod) || "Select"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openPeriod}
                handler={handleOpenPeriod}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Period</DialogHeader>
                <DialogBody>
                    <Select
                        label="Period"
                        color="green"
                        size="lg"
                        value={tempSelectedPeriod}
                        onChange={handlePeriodChange}
                        className="relative"
                    >
                        <Option value="WEEKLY">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/327/327857.png" alt="Week" />
                                <span className="ml-3">Weekly</span>
                            </div>
                        </Option>
                        <Option value="MONTHLY">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/327/327857.png" alt="Month" />
                                <span className="ml-3">Monthly</span>
                            </div>
                        </Option>
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleClosePeriod}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmPeriod}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}