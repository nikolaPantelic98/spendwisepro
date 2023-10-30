import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select, Typography
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import axios from "axios";

export default function AddCategoryParentCategory({ setParent }) {
    const [openParentCategory, setOpenParentCategory] = useState(false);
    const [selectedParentCategory, setSelectedParentCategory] = useState("");
    const [tempSelectedParentCategory, setTempSelectedParentCategory] = useState("");
    const [parents, setParents] = useState([]);

    const handleOpenParentCategory = () => {
        setTempSelectedParentCategory(selectedParentCategory);
        setOpenParentCategory(true);
    };
    const handleCloseParentCategory = () => {
        setSelectedParentCategory(null);
        setParent(null);
        setOpenParentCategory(false);
    };

    const handleConfirmParentCategory = () => {
        setParent(selectedParentCategory);
        setOpenParentCategory(false);
        setTempSelectedParentCategory("");
    };

    const handleParentCategoryChange = (value) => {
        setSelectedParentCategory(value);
    }

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all_root', { headers })
            .then(response => {
                setParents(response.data);
            })
            .catch(error => console.error('Error fetching parent categories:', error));
    }, []);

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
                            {selectedParentCategory ? selectedParentCategory.name : "Select"}
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
                        {/*<Option value={0} key={0}>*/}
                        {/*    <div className="flex items-center">*/}
                        {/*        <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/none-icon/none-icon-13.jpg" alt="None" />*/}
                        {/*        <span className="ml-3">None</span>*/}
                        {/*    </div>*/}
                        {/*</Option>*/}
                        {parents.map((parentCategory) => (
                            <Option value={parentCategory} key={parentCategory.id}>
                                <div className="flex items-center">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={parentCategory.icon.iconPath}
                                        alt={parentCategory.icon.image}
                                    />
                                    <span className="ml-3">{parentCategory.name}</span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-4 ml-1">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Press 'Clean' if this is parent category.
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
                        <span>Clean</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmParentCategory}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}