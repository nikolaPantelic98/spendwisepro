import {
    Card,
    CardBody,
    Button, ListItem
} from "@material-tailwind/react";
import React, {useRef} from "react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";

export default function AddIconForm() {

    const [selectedIcon, setSelectedIcon] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);

    const inputRef = useRef(null);

    const handleClickInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedIcon(e.target.files[0].name);
            setSelectedFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="py-3 sm:py-4">
                            <div>
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" onClick={handleClickInput}>
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://www.seekpng.com/png/detail/764-7640973_choose-icon-touch-circle.png" alt="Icon" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                                            Icon
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-3"></div>
                                        <div className={`text-sm w-[17ch] truncate dark:text-gray-400 ${selectedIcon ? 'font-bold text-gray-500' : 'text-gray-500'} flex items-center justify-between gap-2`}>
                                            <div className="order-last">
                                                {selectedIcon || "Select"}
                                            </div>
                                            <img src={selectedFile} className="w-8 h-8 rounded-full" />
                                        </div>
                                        <div className="h-3"></div>
                                    </div>
                                    <div className="ml-2">
                                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                    </div>
                                </ListItem>
                                <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg, image/jpg, image/png" />
                            </div>
                        </li>
                    </ul>
                    <hr className="my-2 border-blue-gray-50" />
                    <div className="flex justify-center items-center">
                        <Button className="mt-2 w-full" variant="gradient" color="green">
                            <span>Add</span>
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}