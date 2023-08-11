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

export default function BudgetCard() {

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Budgets
                    <Link to="/budgets" onClick={storeScrollPosition}>
                        <Button size="sm" variant="text" className="flex gap-2">
                                Show more
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900 mb-2">
                        Weekly
                    </Typography>

                    <Link to="/budgets/weekly/general" onClick={storeScrollPosition}>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        General
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $70,00
                                        </Typography>
                                        <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                            50%
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={50} size="lg" className="mt-2 mb-2" color="green" />
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
                                            -$5,00
                                        </Typography>
                                        <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                            -10%
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={100} size="lg" className="mt-2 mb-2" color="red" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900 mb-2">
                        Monthly
                    </Typography>

                    <Link>
                        <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                            <div className="flex-1 w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Typography className="text-gray-900 font-medium mt-2 truncate">
                                        General
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $200,00
                                        </Typography>
                                        <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                            10%
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={90} size="lg" className="mt-2 mb-2" color="orange" />
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
                                        Car
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $140,00
                                        </Typography>
                                        <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                            35%
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={65} size="lg" className="mt-2 mb-2" color="green" />
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
                                        House
                                    </Typography>
                                    <div className="flex gap-4 items-center">
                                        <Typography className="text-gray-900 font-semibold mt-2">
                                            $250,00
                                        </Typography>
                                        <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                            50%
                                        </Typography>
                                    </div>
                                </div>
                                <Progress value={50} size="lg" className="mt-2 mb-2" color="green" />
                            </div>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                            </div>
                        </ListItem>
                    </Link>
                </div>



                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <p className="text-xs flex items-center justify-center gap-4">
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-green-500"></span>
                            <span className="text-xxs">In limit</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-orange-500"></span>
                            <span className="text-xxs">Risk of overspent</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-red-500"></span>
                            <span className="text-xxs">Overspent</span>
                        </span>
                    </p>
                </div>

                <div className="h-6"></div>
            </CardBody>
        </Card>
    );
}