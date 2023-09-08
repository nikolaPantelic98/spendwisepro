import {
    Accordion, AccordionBody, AccordionHeader,
    Button,
    Card,
    CardBody, ListItem, Typography,
} from "@material-tailwind/react";
import React from "react";
import '../../App.css';
import {
    ArrowLongRightIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    RectangleGroupIcon
} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

export default function CategoryList() {

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const categories = [
        {
            id: 1,
            name: "Car",
            parentCategory: "None",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1258.9-car-icon-iconbunny.jpg"
        },
        {
            id: 2,
            name: "Food & Drinks",
            parentCategory: "None",
            icon: "https://icon-library.com/images/icon-food/icon-food-13.jpg"
        },
        {
            id: 3,
            name: "Communication & PC",
            parentCategory: "None",
            icon: "https://cdn-icons-png.flaticon.com/512/186/186056.png"
        },
        {
            id: 4,
            name: "Shopping",
            parentCategory: "None",
            icon: "https://cdn2.iconfinder.com/data/icons/online-shopping-flat-round/550/cart-512.png"
        },
        {
            id: 5,
            name: "Fuel",
            parentCategory: "Car",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg"
        },
        {
            id: 6,
            name: "Parking",
            parentCategory: "Car",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/1/2/1228.9-parking-sign-icon-iconbunny.jpg"
        },
        {
            id: 7,
            name: "Groceries",
            parentCategory: "Food & Drinks",
            icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg"
        },
        {
            id: 8,
            name: "Restaurant",
            parentCategory: "Food & Drinks",
            icon: "https://cdn-icons-png.flaticon.com/512/227/227326.png"
        },
        {
            id: 9,
            name: "Snacks",
            parentCategory: "Food & Drinks",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg"
        },
        {
            id: 10,
            name: "Bar & Cafe",
            parentCategory: "Food & Drinks",
            icon: "https://w7.pngwing.com/pngs/50/319/png-transparent-coffee-icon100-computer-icons-android-pub-orange-logo-coffee-thumbnail.png"
        },
        {
            id: 11,
            name: "Phone",
            parentCategory: "Communication & PC",
            icon: "https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png"
        },
        {
            id: 12,
            name: "Internet",
            parentCategory: "Communication & PC",
            icon: "https://www.iconbunny.com/icons/media/catalog/product/1/9/195.9-wifi-icon-iconbunny.jpg"
        },
        {
            id: 13,
            name: "PC & Laptop",
            parentCategory: "Communication & PC",
            icon: "https://cdn3.iconfinder.com/data/icons/flat-rounded-5/50/482-512.png"
        },
        {
            id: 14,
            name: "Clothes & Shoes",
            parentCategory: "Shopping",
            icon: "https://cdn-icons-png.flaticon.com/512/189/189569.png"
        },
        {
            id: 15,
            name: "Jewels & Accessories",
            parentCategory: "Shopping",
            icon: "https://www.shareicon.net/data/2016/08/18/809300_diamond_512x512.png"
        },
        {
            id: 16,
            name: "Home & Garden",
            parentCategory: "Shopping",
            icon: "https://cdn-icons-png.flaticon.com/512/3693/3693434.png"
        },
    ]

    // Filter parent categories from the 'categories' array.
    const parentCategories = (() => {
        return categories.filter(category => {
            return category.parentCategory === "None";
        });
    })();

    // Filter subcategories from the 'categories' array.
    const subCategories = (() => {
        return categories.filter(category => {
            return category.parentCategory !== "None";
        });
    })();

    // Create full categories by mapping parent categories and adding corresponding subcategories.
    const fullCategories = parentCategories.map(superCategory => {
        const subCats = subCategories.filter(subCategory => subCategory.parentCategory === superCategory.name);

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
                                                <img className="w-8 h-8 rounded-full" src={superCategory.icon} alt={superCategory.name} />
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
                                                                <img className="w-8 h-8 rounded-full" src={subCategory.icon} alt={subCategory.name} />
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