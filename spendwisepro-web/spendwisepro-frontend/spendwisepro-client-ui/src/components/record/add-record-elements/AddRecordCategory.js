import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function AddRecordCategory() {

    // amount

    const [openCategory, setOpenCategory] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [tempSelectedCategory, setTempSelectedCategory] = React.useState("");
    const handleOpenCategory = () => {
        setTempSelectedCategory(selectedCategory);
        setOpenCategory(true);
    };
    const handleCloseCategory = () => {
        setSelectedCategory(tempSelectedCategory);
        setOpenCategory(false);
    };

    const handleConfirmCategory = () => {
        setOpenCategory(false);
        setTempSelectedCategory("");
    };
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenCategory}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/0/1048.9-discount-tag-ii-icon-iconbunny.jpg" alt="Category" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Category
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${selectedCategory ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {selectedCategory || "Select"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openCategory}
                handler={handleOpenCategory}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Category</DialogHeader>
                <DialogBody>
                    <Select
                        label="Category"
                        menuProps={{ className: "h-48" }}
                        color="green"
                        size="lg"
                        value={tempSelectedCategory}
                        onChange={handleCategoryChange}
                        className="relative"
                    >
                        <Option value="Grocery">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" alt="Grocery" />
                                <span className="ml-3">Grocery</span>
                            </div>
                        </Option>
                        <Option value="Fuel">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" alt="Fuel" />
                                <span className="ml-3">Fuel</span>
                            </div>
                        </Option>
                        <Option value="Phone">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png" alt="Phone" />
                                <span className="ml-3">Phone</span>
                            </div>
                        </Option>
                        <Option value="Snacks">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1617/1617569.png" alt="Snacks" />
                                <span className="ml-3">Snacks</span>
                            </div>
                        </Option>
                        <Option value="Tax">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/Y04MgVW/tax-icon-15117.png" alt="Tax" />
                                <span className="ml-3">Tax</span>
                            </div>
                        </Option>
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseCategory}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmCategory}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}