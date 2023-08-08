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

export default function AddCreditCardBank() {

    const [openBank, setOpenBank] = React.useState(false);
    const [typedBank, setTypedBank] = React.useState("");
    const [isBankTyped, setIsBankTyped] = React.useState(false);
    const [tempTypedBank, setTempANoteContent] = React.useState("");
    const handleOpenNote = () => {
        setTempANoteContent(typedBank);
        setOpenBank(true);
    };
    const handleCloseNote = () => {
        if (isBankTyped) {
            setTypedBank(tempTypedBank);
        }
        setOpenBank(false);
    };
    const handleConfirmNote = () => {
        if (!isBankTyped) {
            setTempANoteContent("");
            setIsBankTyped(false);
        }
        setOpenBank(false);
    };
    const handleNoteChange = (event) => {
        setTypedBank(event.target.value);
        setIsBankTyped(event.target.value !== "");
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenNote}>
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
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isBankTyped ? 'font-bold text-gray-500 truncate' : ''}`}>
                            {typedBank ? typedBank : "Type"}
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
                handler={handleOpenNote}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Bank</DialogHeader>
                <DialogBody>
                    <Input label="Bank" color="green" value={typedBank} onChange={handleNoteChange} />
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
    );
}