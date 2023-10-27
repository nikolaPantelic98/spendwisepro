import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select, Typography
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {InformationCircleIcon} from "@heroicons/react/20/solid";

const colorOptions = [
    "https://i.ibb.co/KxFFbSz/blue-gray.png",
    "https://i.ibb.co/p2zphsf/gray.png",
    "https://i.ibb.co/tZnGD2d/brown.png",
    "https://i.ibb.co/3Chy0PT/deep-orange.png",
    "https://i.ibb.co/9vgqFdS/orange.png",
    "https://i.ibb.co/yQ2sQv8/amber.png",
    "https://i.ibb.co/xL8Hk2t/yellow.png",
    "https://i.ibb.co/KzM5dBY/lime.png",
    "https://i.ibb.co/CtHgJqc/light-green.png",
    "https://i.ibb.co/pJDFFbr/green.png",
    "https://i.ibb.co/4pc1szg/teal.png",
    "https://i.ibb.co/TtJGdmp/cyan.png",
    "https://i.ibb.co/hFgDjbY/light-blue.png",
    "https://i.ibb.co/Q6LzwQF/blue.png",
    "https://i.ibb.co/89NTH46/indigo.png",
    "https://i.ibb.co/ccWzHZt/deep-purple.png",
    "https://i.ibb.co/2hcRVhs/purple.png",
    "https://i.ibb.co/CmMyFBr/pink.png",
    "https://i.ibb.co/C7mNPLf/red.png"
];

export default function AddCategoryColor({ onColorChange }) {

    const [openColor, setOpenColor] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState("");
    const [tempSelectedColor, setTempSelectedColor] = React.useState("");
    const handleOpenColor = () => {
        setTempSelectedColor(selectedColor);
        setOpenColor(true);
    };
    const handleCloseColor = () => {
        setSelectedColor(tempSelectedColor);
        setOpenColor(false);
    };
    const handleConfirmColor = () => {
        setOpenColor(false);
        setSelectedColor(tempSelectedColor);
        onColorChange(selectedColor);
    };
    const handleIconColor = (value) => {
        setSelectedColor(value);
        setTempSelectedColor(value);
    };

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenColor}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/mFCpZXC/paint-palette.png" alt="Color"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Color
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-3"></div>
                        <div
                            className={`text-sm truncate dark:text-gray-400 ${
                                selectedColor
                                    ? "font-bold text-gray-500"
                                    : "text-gray-500"
                            }`}
                        >
                            {selectedColor ? (
                                <img
                                    className="w-8 h-8 inline-block"
                                    src={selectedColor}
                                    alt="Selected Color"
                                />
                            ) : (
                                "Select"
                            )}
                        </div>
                        <div className="h-3"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openColor}
                handler={handleOpenColor}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Color</DialogHeader>
                <DialogBody>
                    <Select
                        label="Color"
                        menuProps={{ className: "h-48 grid grid-cols-4 gap-1" }}
                        color="green"
                        size="lg"
                        value={tempSelectedColor}
                        onChange={handleIconColor}
                        className="relative"
                    >
                        {colorOptions.map((option) => (
                            <Option value={option} key={option}>
                                <div className="flex items-center justify-center">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={option}
                                    />
                                </div>
                            </Option>
                        ))}
                    </Select>
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2 ml-1">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Use colors to group subcategories
                    </Typography>
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal ml-6">
                        under the same parent category.
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseColor}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleConfirmColor}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}