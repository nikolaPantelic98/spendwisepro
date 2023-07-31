import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function GoalsList() {

    return (
        <>
            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                        Weekly
                        <Link>
                            <Button size="sm" variant="text" className="flex gap-2">
                                Add goal
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link to="/goals/weekly/laptop">
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    Laptop
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        $100,00
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={80} size="lg" className="mt-2 mb-2" color="orange" />
                                            <div className="flex justify-between">
                                                <Typography className="text-sm font-semibold text-green-800">$80,00</Typography>
                                                <Typography className="text-sm font-semibold text-gray-800">$20,00</Typography>
                                            </div>
                                            <div className="flex justify-between">
                                                <Typography className="text-xs font-medium text-gray-600">Saved</Typography>
                                                <Typography className="text-xs font-medium text-gray-600">To save</Typography>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    Aqua Park
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        $20,00
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={100} size="lg" className="mt-2 mb-2" color="green" />
                                            <div className="flex justify-between">
                                                <Typography className="text-sm font-semibold text-green-800">$20,00</Typography>
                                                <Typography className="text-sm font-semibold text-gray-800">$0,00</Typography>
                                            </div>
                                            <div className="flex justify-between">
                                                <Typography className="text-xs font-medium text-gray-600">Saved</Typography>
                                                <Typography className="text-xs font-medium text-gray-600">To save</Typography>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                        Monthly
                        <Link>
                            <Button size="sm" variant="text" className="flex gap-2">
                                Add goal
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    Vacation
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        $150,00
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={40} size="lg" className="mt-2 mb-2" color="orange" />
                                            <div className="flex justify-between">
                                                <Typography className="text-sm font-semibold text-green-800">$60,00</Typography>
                                                <Typography className="text-sm font-semibold text-gray-800">$90,00</Typography>
                                            </div>
                                            <div className="flex justify-between">
                                                <Typography className="text-xs font-medium text-gray-600">Saved</Typography>
                                                <Typography className="text-xs font-medium text-gray-600">To save</Typography>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                            <li className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    House
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        $500,00
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={10} size="lg" className="mt-2 mb-2" color="orange" />
                                            <div className="flex justify-between">
                                                <Typography className="text-sm font-semibold text-green-800">$50,00</Typography>
                                                <Typography className="text-sm font-semibold text-gray-800">$450,00</Typography>
                                            </div>
                                            <div className="flex justify-between">
                                                <Typography className="text-xs font-medium text-gray-600">Saved</Typography>
                                                <Typography className="text-xs font-medium text-gray-600">To save</Typography>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}