import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export default function TopExpensesCard() {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Top expenses
                    <Link to="/expenses" onClick={scrollToTop}>
                        <Button size="sm" variant="text" className="flex gap-2">
                            View all
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    <Typography  className="uppercase text-sm font-medium text-gray-700 mb-4">
                        This month
                    </Typography>

                    <Link>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        Bills
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $230,00
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={100} size="lg" className="mt-2 mb-2" color="cyan" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>

                    <Link>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        Groceries
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $205,00
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={89} size="lg" className="mt-2 mb-2" color="yellow" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>

                    <Link>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        Fuel
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $150,00
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={65} size="lg" className="mt-2 mb-2" color="indigo" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>

                    <Link>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        Tobacco
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $55,00
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={24} size="lg" className="mt-2 mb-2" color="blue-gray" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>

                    <Link>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        Snacks
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $40,00
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={17} size="lg" className="mt-2 mb-2" color="light-green" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <Typography
                        variant="small"
                        color="gray"
                        className="mt-2 flex items-center gap-4 font-normal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        The color of the progress bar is the color of the category.
                    </Typography>
                </div>

                <div className="h-3"></div>
            </CardBody>
        </Card>
    );
}