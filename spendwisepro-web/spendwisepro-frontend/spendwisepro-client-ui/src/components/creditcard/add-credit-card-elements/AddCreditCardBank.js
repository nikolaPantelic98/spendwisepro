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

export default function AddCreditCardBank({ setBank, initialValue = "" }) {

    const [openBank, setOpenBank] = React.useState(false);
    const [contentBank, setContentBank] = React.useState(initialValue);
    const [isBankTyped, setIsBankTyped] = React.useState(false);
    const [tempBankContent, setTempBankContent] = React.useState("");

    const handleOpenBank = () => {
        setTempBankContent(contentBank);
        setOpenBank(true);
    };
    const handleCloseBank = () => {
        if (isBankTyped) {
            setContentBank(tempBankContent);
        }
        setOpenBank(false);
    };
    const handleConfirmBank = () => {
        if (!isBankTyped) {
            setTempBankContent("");
            setIsBankTyped(false);
        }
        setBank(contentBank);
        setOpenBank(false);
    };
    const handleBankChange = (event) => {
        setContentBank(event.target.value);
        setIsBankTyped(event.target.value !== "");
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenBank}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/9/4/948.9-local-banks-icon-iconbunny.jpg" alt="Bank" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Bank
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isBankTyped || initialValue !== "" ? 'font-bold text-gray-500 truncate' : ''}`}>
                            {contentBank ? contentBank : "Type"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openBank}
                handler={handleOpenBank}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Bank</DialogHeader>
                <DialogBody>
                    <Input label="Bank" color="green" value={contentBank} onChange={handleBankChange} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseBank}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmBank}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}