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
import React, {useContext, useEffect} from "react";
import {RecordContext} from "../add-record/AddRecordTabs";

export default function RecordNote({ setNote }) {

    const { record } = useContext(RecordContext);

    const [openNote, setOpenNote] = React.useState(false);
    const [contentNote, setContentNote] = React.useState(record.note);
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
        setNote(contentNote);
        setOpenNote(false);
    };
    const handleNoteChange = (event) => {
        setContentNote(event.target.value);
        setIsNoteTyped(event.target.value !== "");
    }

    useEffect(() => {
        setContentNote(record.note);
    }, [record.note]);

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenNote}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/190/190703.png" alt="Note" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Note
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm text-gray-500 truncate dark:text-gray-400 ${isNoteTyped || record.note !== "" ? 'font-bold text-gray-500 truncate' : ''}`}>
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
                <DialogHeader>Note</DialogHeader>
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
    );
}