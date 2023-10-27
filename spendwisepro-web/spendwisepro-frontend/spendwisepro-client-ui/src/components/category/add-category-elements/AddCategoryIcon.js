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
import React from "react";

const iconOptions = [
    "https://www.iconbunny.com/icons/media/catalog/product/1/2/1258.9-car-icon-iconbunny.jpg",
    "https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg",
    "https://www.iconbunny.com/icons/media/catalog/product/1/2/1228.9-parking-sign-icon-iconbunny.jpg",
    "https://icon-library.com/images/icon-food/icon-food-13.jpg",
    "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg",
    "https://cdn-icons-png.flaticon.com/512/227/227326.png",
    "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg",
    "https://w7.pngwing.com/pngs/50/319/png-transparent-coffee-icon100-computer-icons-android-pub-orange-logo-coffee-thumbnail.png",
    "https://cdn-icons-png.flaticon.com/512/186/186056.png",
    "https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png",
    "https://www.iconbunny.com/icons/media/catalog/product/1/9/195.9-wifi-icon-iconbunny.jpg",
    "https://cdn3.iconfinder.com/data/icons/flat-rounded-5/50/482-512.png",
    "https://cdn2.iconfinder.com/data/icons/online-shopping-flat-round/550/cart-512.png",
    "https://cdn-icons-png.flaticon.com/512/189/189569.png",
    "https://www.shareicon.net/data/2016/08/18/809300_diamond_512x512.png",
    "https://cdn-icons-png.flaticon.com/512/3693/3693434.png",
];

export default function AddCategoryIcon({ onIconChange }) {
    const [openIcon, setOpenIcon] = React.useState(false);
    const [selectedIcon, setSelectedIcon] = React.useState("");
    const [tempSelectedIcon, setTempSelectedIcon] = React.useState("");
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
        setSelectedIcon(tempSelectedIcon);
        onIconChange(selectedIcon);
    };
    const handleIconChange = (value) => {
        setSelectedIcon(value);
        setTempSelectedIcon(value);
    };

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
                                    src={selectedIcon}
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
                        {iconOptions.map((option) => (
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