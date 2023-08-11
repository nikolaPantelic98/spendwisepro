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

export default function AddBudgetName() {

    const [openName, setOpenName] = React.useState(false);
    const [contentName, setContentName] = React.useState("");
    const [isNameTyped, setIsNameTyped] = React.useState(false);
    const [tempNameContent, setTempANoteContent] = React.useState("");
    const handleOpenName = () => {
        setTempANoteContent(contentName);
        setOpenName(true);
    };
    const handleCloseName = () => {
        if (isNameTyped) {
            setContentName(tempNameContent);
        }
        setOpenName(false);
    };
    const handleConfirmName = () => {
        if (!isNameTyped) {
            setTempANoteContent("");
            setIsNameTyped(false);
        }
        setOpenName(false);
    };
    const handleNameChange = (event) => {
        setContentName(event.target.value);
        setIsNameTyped(event.target.value !== "");
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenName}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/4/0/4039.9-documents-and-pen-icon-iconbunny.jpg" alt="Name" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Name
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isNameTyped ? 'font-bold text-gray-500 truncate' : ''}`}>
                            {contentName ? contentName : "Type"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openName}
                handler={handleOpenName}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Name</DialogHeader>
                <DialogBody>
                    <Input label="Name" color="green" value={contentName} onChange={handleNameChange} />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseName}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmName}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}