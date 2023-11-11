import {
    Accordion, AccordionBody, AccordionHeader,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select
} from "@material-tailwind/react";
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function AddRecordCategory({ setCategory, initialValue = "" }) {

    const [openCategory, setOpenCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(initialValue);
    const [tempSelectedCategory, setTempSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const handleOpenCategory = () => {
        setTempSelectedCategory(selectedCategory);
        setOpenCategory(true);
    };
    const handleCloseCategory = () => {
        setSelectedCategory(null);
        setCategory(null);
        setOpenCategory(false);
    };

    const handleConfirmCategory = () => {
        setCategory(selectedCategory);
        setOpenCategory(false);
        setTempSelectedCategory("");
    };
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all', { headers })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Filter parent categories from the 'categories' array.
    const parentCategories = (() => {
        return categories.filter(category => {
            return category.parent === null;
        });
    })();

    // Filter subcategories from the 'categories' array.
    const subCategories = (() => {
        return categories.filter(category => {
            return category.parent !== null;
        });
    })();

    // Create full categories by mapping parent categories and adding corresponding subcategories.
    const fullCategories = parentCategories.map(superCategory => {
        const subCats = subCategories.filter(subCategory => subCategory.parent.name === superCategory.name);

        return {
            ...superCategory,
            subCategories: subCats,
        };
    });

    const [open, setOpen] = useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
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
                            {selectedCategory ? (selectedCategory.name.length > 14 ? selectedCategory.name.substring(0, 11) + "..." : selectedCategory.name) : "Select"}
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
                        {fullCategories.map(superCategory => (
                            <Accordion
                                key={superCategory.id}
                                open={open === superCategory.id}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 text-green-800 transition-transform ${open === superCategory.id ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" selected={open === superCategory.id}>
                                    <AccordionHeader onClick={() => handleOpen(superCategory.id)} className="border-b-0 p-3 gap-4 pl-0">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={superCategory.icon.iconPath} alt={superCategory.icon.image} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="h-1"></div>
                                            <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                {superCategory.name}
                                            </p>
                                            <div className="h-1"></div>
                                        </div>
                                    </AccordionHeader>
                                </ListItem>

                                <AccordionBody className="py-1">
                                    {superCategory.subCategories.length === 0 ? (
                                        <li>
                                            <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-3 pr-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="h-3"></div>
                                                    <p className="text-sm text-center text-gray-500 truncate">
                                                        There are currently no
                                                    </p>
                                                    <p className="text-sm text-center text-gray-500 truncate">
                                                        subcategories
                                                    </p>
                                                    <div className="h-3"></div>
                                                    <div className="flex justify-center items-center">
                                                        <Link to="/add_category" onClick={storeScrollPosition} className="w-full">
                                                            <Button className="w-full" variant="gradient" color="green">
                                                                <span>Add subcategory</span>
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <div className="h-3"></div>
                                                </div>
                                            </ListItem>
                                        </li>
                                    ) : (
                                        superCategory.subCategories.map(subCategory => (
                                            <Option value={subCategory} key={subCategory.id}>
                                                <li>
                                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-3 pr-2">
                                                        <div className="pl-5 border-l-2 border-green-500">
                                                            <img className="w-8 h-8 rounded-full" src={subCategory.icon.iconPath} alt={subCategory.icon.image} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="h-2"></div>
                                                            <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                                {subCategory.name}
                                                            </p>
                                                            <div className="h-2"></div>
                                                        </div>
                                                    </ListItem>
                                                </li>
                                            </Option>
                                        ))
                                    )}
                                </AccordionBody>
                            </Accordion>
                        ))}
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