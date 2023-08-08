import {
    Accordion, AccordionBody, AccordionHeader,
    Button,
    Card,
    CardBody, ListItem, Typography,
} from "@material-tailwind/react";
import React from "react";
import '../../App.css';
import {ArrowLongRightIcon, ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

export default function CategoryList() {

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Categories
                    <Link to="/add_category">
                        <Button size="sm" variant="text" className="flex gap-2">
                            Add
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
                </Typography>
                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        <Accordion
                            open={open === 1}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 text-green-800 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" selected={open === 1}>
                                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 gap-4 pl-0">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1258.9-car-icon-iconbunny.jpg" alt="Car" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                            Car
                                        </p>
                                        <p className="text-sm font-medium text-gray-500 truncate">
                                            Parent category
                                        </p>
                                        <div className="h-1"></div>
                                    </div>
                                </AccordionHeader>
                            </ListItem>

                            <AccordionBody className="py-1">
                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1248.9-petrol-pump-icon-iconbunny.jpg" alt="Fuel" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Fuel
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Car
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/2/1228.9-parking-sign-icon-iconbunny.jpg" alt="Parking" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Parking
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Car
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                            </AccordionBody>
                        </Accordion>

                        <Accordion
                            open={open === 2}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 text-green-800 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" selected={open === 1}>
                                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 gap-4 pl-0">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/icon-food/icon-food-13.jpg" alt="Food and drinks" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                            Food & Drinks
                                        </p>
                                        <p className="text-sm font-medium text-gray-500 truncate">
                                            Parent category
                                        </p>
                                        <div className="h-1"></div>
                                    </div>
                                </AccordionHeader>
                            </ListItem>

                            <AccordionBody className="py-1">
                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" alt="Groceries" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Groceries
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Food & Drinks
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/227/227326.png" alt="Restaurant" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Restaurant
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Food & Drinks
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg" alt="Snacks" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Snacks
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Food & Drinks
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://w7.pngwing.com/pngs/50/319/png-transparent-coffee-icon100-computer-icons-android-pub-orange-logo-coffee-thumbnail.png" alt="Bar and cafe" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Bar, cafe
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Food & Drinks
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                            </AccordionBody>
                        </Accordion>

                        <Accordion
                            open={open === 3}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 text-green-800 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" selected={open === 1}>
                                <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3 gap-4 pl-0">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/186/186056.png" alt="Communication & PC" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                            Communication & PC
                                        </p>
                                        <p className="text-sm font-medium text-gray-500 truncate">
                                            Parent category
                                        </p>
                                        <div className="h-1"></div>
                                    </div>
                                </AccordionHeader>
                            </ListItem>

                            <AccordionBody className="py-1">
                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png" alt="Phone" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Phone
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Communication & PC
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://www.iconbunny.com/icons/media/catalog/product/1/9/195.9-wifi-icon-iconbunny.jpg" alt="Internet" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Internet
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Communication & PC
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://cdn3.iconfinder.com/data/icons/flat-rounded-5/50/482-512.png" alt="PC and laptop" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    PC & Laptop
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Communication & PC
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                            </AccordionBody>
                        </Accordion>

                        <Accordion
                            open={open === 4}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 text-green-800 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50" selected={open === 1}>
                                <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3 gap-4 pl-0">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn2.iconfinder.com/data/icons/online-shopping-flat-round/550/cart-512.png" alt="Shopping" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-1"></div>
                                        <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                            Shopping
                                        </p>
                                        <p className="text-sm font-medium text-gray-500 truncate">
                                            Parent category
                                        </p>
                                        <div className="h-1"></div>
                                    </div>
                                </AccordionHeader>
                            </ListItem>

                            <AccordionBody className="py-1">
                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/189/189569.png" alt="Clothes and shoes" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Clothes & Shoes
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Shopping
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://www.shareicon.net/data/2016/08/18/809300_diamond_512x512.png" alt="Jewels and accessories" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Jewels & Accessories
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Shopping
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                                <li className="py-2 sm:py-3">
                                    <Link>
                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50 pl-8 pr-2">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3693/3693434.png" alt="Home and garden" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="h-3"></div>
                                                <p className="text-sm font-semibold text-green-600 truncate dark:text-white">
                                                    Home & Garden
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Shopping
                                                </p>
                                                <div className="h-3"></div>
                                            </div>
                                            <div className="ml-2">
                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                            </div>
                                        </ListItem>
                                    </Link>
                                </li>

                            </AccordionBody>
                        </Accordion>

                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}