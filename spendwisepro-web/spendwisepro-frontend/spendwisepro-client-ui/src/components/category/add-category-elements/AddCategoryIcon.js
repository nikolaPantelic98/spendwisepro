import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem,
    Option,
    Select,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function AddCategoryIcon({ setIcon, initialValue = "" }) {
    const [openIcon, setOpenIcon] = React.useState(false);
    const [selectedIcon, setSelectedIcon] = React.useState(initialValue);
    const [tempSelectedIcon, setTempSelectedIcon] = React.useState("");
    const [icons, setIcons] = useState([]);

    const handleOpenIcon = () => {
        setTempSelectedIcon(selectedIcon);
        setOpenIcon(true);
    };
    const handleCloseIcon = () => {
        setSelectedIcon(tempSelectedIcon);
        setOpenIcon(false);
    };
    const handleConfirmIcon = () => {
        setOpenIcon(false);
        setIcon(selectedIcon);
        setSelectedIcon(tempSelectedIcon);
    };
    const handleIconChange = (value) => {
        setSelectedIcon(value);
        setTempSelectedIcon(value);
    };

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/icons/all', { headers })
            .then(response => {
                setIcons(response.data);
            })
            .catch(error => console.error('Error fetching icons:', error));
    }, []);

    function findIconImage(icon) {
        return icon.iconPath;
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenIcon}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://www.seekpng.com/png/detail/764-7640973_choose-icon-touch-circle.png"
                            alt="Icon"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Icon
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-3"></div>
                        <div
                            className={`text-sm truncate dark:text-gray-400 ${
                                selectedIcon
                                    ? "font-bold text-gray-500"
                                    : "text-gray-500"
                            }`}
                        >
                            {selectedIcon ? (
                                <img
                                    className="w-8 h-8 inline-block"
                                    src={findIconImage(selectedIcon)}
                                    alt="Selected Icon"
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
                open={openIcon}
                handler={handleOpenIcon}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Icon</DialogHeader>
                <DialogBody>
                    <Select
                        label="Icon"
                        menuProps={{ className: "h-48 grid grid-cols-4 gap-1" }}
                        color="green"
                        size="lg"
                        value={tempSelectedIcon}
                        onChange={handleIconChange}
                        className="relative"
                    >
                        {icons.map((icon) => (
                            <Option value={icon} key={icon.id}>
                                <div className="flex items-center justify-center">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={icon.iconPath}
                                        alt={icon.image}
                                    />
                                </div>
                            </Option>
                        ))}
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseIcon}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleConfirmIcon}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}