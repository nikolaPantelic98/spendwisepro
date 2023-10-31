import {
    Accordion, AccordionBody, AccordionHeader,
    Button,
    Card,
    CardBody, ListItem, Typography,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import '../../App.css';
import {
    ArrowLongRightIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    RectangleGroupIcon
} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import axios from "axios";

export default function CategoryList() {

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const [categories, setCategories] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all', { headers })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching parent categories:', error));
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

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Categories
                    {fullCategories.length > 0 && (
                        <Link to="/add_category">
                            <Button size="sm" variant="text" className="flex gap-2">
                                Add
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </Typography>
                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        <div>
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
                                                <p className="text-sm font-medium text-gray-500 truncate">
                                                    Parent category
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
                                                <li key={subCategory.id}>
                                                    <Link>
                                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-3 pr-2">
                                                            <div className="pl-5 border-l-2 border-green-500">
                                                                <img className="w-8 h-8 rounded-full" src={subCategory.icon.iconPath} alt={subCategory.icon.image} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="h-3"></div>
                                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                                    {subCategory.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {superCategory.name}
                                                                </p>
                                                                <div className="h-3"></div>
                                                            </div>
                                                            <div className="ml-2">
                                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                            </div>
                                                        </ListItem>
                                                    </Link>
                                                </li>
                                            ))
                                        )}
                                    </AccordionBody>
                                </Accordion>
                            ))}

                            {fullCategories.length === 0 && (
                                <div>
                                    <div className="flex justify-center items-center flex-col mb-6">
                                        <RectangleGroupIcon className="w-20 h-20 text-green-600 mb-2"/>
                                        <Typography variant="h6" className="text-gray-600">
                                            You currently have no
                                        </Typography>
                                        <Typography variant="h6" className="text-gray-600">
                                            categories created
                                        </Typography>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Link to="/add_category" onClick={storeScrollPosition} className="w-full">
                                            <Button className="w-full" variant="gradient" color="green">
                                                <span>Add Category</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}