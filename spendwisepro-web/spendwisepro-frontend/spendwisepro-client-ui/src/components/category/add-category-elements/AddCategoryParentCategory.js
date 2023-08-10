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

export default function AddCategoryParentCategory() {

    const [openParentCategory, setOpenParentCategory] = React.useState(false);
    const [selectedParentCategory, setSelectedParentCategory] = React.useState("");
    const [tempSelectedParentCategory, setTempSelectedParentCategory] = React.useState("");
    const handleOpenParentCategory = () => {
        setTempSelectedParentCategory(selectedParentCategory);
        setOpenParentCategory(true);
    };
    const handleCloseParentCategory = () => {
        setSelectedParentCategory(tempSelectedParentCategory);
        setOpenParentCategory(false);
    };

    const handleConfirmParentCategory = () => {
        setOpenParentCategory(false);
        setTempSelectedParentCategory("");
    };
    const handleParentCategoryChange = (value) => {
        setSelectedParentCategory(value);
    }

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenParentCategory}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/icon-categories/icon-categories-0.jpg" alt="Parent category" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Parent Category
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${selectedParentCategory ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {selectedParentCategory || "Select"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openParentCategory}
                handler={handleOpenParentCategory}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Parent Category</DialogHeader>
                <DialogBody>
                    <Select
                        label="Parent Category"
                        menuProps={{ className: "h-48" }}
                        color="green"
                        size="lg"
                        value={tempSelectedParentCategory}
                        onChange={handleParentCategoryChange}
                        className="relative"
                    >
                        <Option value="None">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/none-icon/none-icon-13.jpg" alt="None" />
                                <span className="ml-3">None</span>
                            </div>
                        </Option>
                        <Option value="Car">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1258.9-car-icon-iconbunny.jpg" alt="Car" />
                                <span className="ml-3">Car</span>
                            </div>
                        </Option>
                        <Option value="Food & Drinks">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/icon-food/icon-food-13.jpg" alt="Food and drinks" />
                                <span className="ml-3">Food & Drinks</span>
                            </div>
                        </Option>
                        <Option value="Communication & PC">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/186/186056.png" alt="Communication and PC" />
                                <span className="ml-3">Communication & PC</span>
                            </div>
                        </Option>
                        <Option value="Shopping">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full" src="https://cdn2.iconfinder.com/data/icons/online-shopping-flat-round/550/cart-512.png" alt="Shopping" />
                                <span className="ml-3">Shopping</span>
                            </div>
                        </Option>
                    </Select>
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-4 ml-1">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Choose 'None' if this is parent category.
                    </Typography>
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2 ml-1">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Parent categories are used to group
                    </Typography>
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal ml-6">
                        categories and its their only purpose.
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseParentCategory}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmParentCategory}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}