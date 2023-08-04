import {
    Card,
    CardBody,
    Typography,
    ListItem,
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export default function ExpensesListMonth() {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    All expenses
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
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

                    <Link>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        Health care
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $30,00
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={13} size="lg" className="mt-2 mb-2" color="green" />
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
                                        Cinema
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $10,00
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={4} size="lg" className="mt-2 mb-2" color="deep-orange" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
}