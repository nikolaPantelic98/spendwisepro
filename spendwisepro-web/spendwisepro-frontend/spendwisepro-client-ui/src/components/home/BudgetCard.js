import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";

export default function BudgetCard() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Budgets
                    <Button size="sm" variant="text" className="flex gap-2">
                        <a>
                            Show more
                        </a>
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Weekly
                    </Typography>
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                General
                            </Typography>
                            <div className="flex gap-3">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $70,00
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2">
                                    50%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={50} size="lg" className="mt-2" color="green" />
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Tobacco
                            </Typography>
                            <div className="flex gap-3">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $25,00
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2">
                                    75%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={25} size="lg" className="mt-2" color="green" />
                    </div>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Monthly
                    </Typography>
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                General
                            </Typography>
                            <div className="flex gap-3">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    $235,15
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2">
                                    20%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={80} size="lg" className="mt-2" color="green" />
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                            <Typography className="text-gray-900 font-medium mt-2">
                                Car
                            </Typography>
                            <div className="flex gap-3">
                                <Typography className="text-gray-900 font-semibold mt-2">
                                    150,00
                                </Typography>
                                <Typography className="text-gray-700 font-medium mt-2">
                                    35%
                                </Typography>
                            </div>
                        </div>
                        <Progress value={65} size="lg" className="mt-2" color="green" />
                    </div>
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <p className="text-xs flex items-center justify-center gap-4">
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-green-500"></span><span className="text-xxs">In limit</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-orange-500"></span><span className="text-xxs">Risk of overspent</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-red-500"></span><span className="text-xxs">Overspent</span>
                        </span>
                    </p>
                </div>

                <div className="h-8"></div>
            </CardBody>
        </Card>
    );
}