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

export default function AddCreditCardAmount({ setAmount, initialValue = "" }) {

    const [openAmount, setOpenAmount] = React.useState(false);
    const [amountValue, setAmountValue] = React.useState(initialValue);
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
        setAmount(amountValue);
        setOpenAmount(false);
    };
    const handleAmountChange = (event) => {
        setAmountValue(event.target.value);
        setIsAmountTyped(event.target.value !== "");
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenAmount}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/189/189715.png" alt="Amount" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Amount
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isAmountTyped || initialValue !== "" ? 'font-bold text-gray-800 truncate' : ''}`}>
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
    );
}