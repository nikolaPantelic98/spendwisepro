import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader, Input,
    ListItem
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function CreditCardType({ setType, initialValue = "" }) {

    const [openType, setOpenType] = React.useState(false);
    const [contentType, setContentType] = React.useState(initialValue);
    const [isTypeTyped, setIsTypeTyped] = React.useState(false);
    const [tempTypeContent, setTempTypeContent] = React.useState("");

    const handleOpenType = () => {
        setTempTypeContent(contentType);
        setOpenType(true);
    };
    const handleCloseType = () => {
        if (isTypeTyped) {
            setContentType(tempTypeContent);
        }
        setOpenType(false);
    };

    const handleConfirmType = () => {
        if (!isTypeTyped) {
            setTempTypeContent("");
            setIsTypeTyped(false);
        }
        setType(contentType);
        setOpenType(false);
    };
    const handleTypeChange = (event) => {
        setContentType(event.target.value);
        setIsTypeTyped(event.target.value !== "");
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenType}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.pngitem.com/pimgs/m/544-5444157_credit-card-icons-png-credit-card-icon-green.png" alt="Type" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Type
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isTypeTyped || initialValue !== "" ? 'font-bold text-gray-500 truncate' : ''}`}>
                            {contentType ? contentType : "Type"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openType}
                handler={handleOpenType}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Type</DialogHeader>
                <DialogBody>
                    <Input label="Type" color="green" value={contentType} onChange={handleTypeChange} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseType}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmType}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}