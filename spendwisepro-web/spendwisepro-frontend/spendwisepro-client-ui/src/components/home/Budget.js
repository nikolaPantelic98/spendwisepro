import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";

export default function Budget() {
    return (
        <Card className="mt-6 w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Budgets
                    <Button size="sm" variant="text" className="flex gap-2">
                        <a href="#">
                            Show more
                        </a>
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </Typography>
                <hr className="my-2 border-blue-gray-50 mb-8" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Weekly
                    </Typography>
                    <div className="flex items-center justify-between mb-4">
                        <Typography className="text-gray-900 font-medium mt-2">
                            Week
                        </Typography>
                        <Typography className="text-gray-900 font-semibold mt-2">
                            $70,00
                        </Typography>
                    </div>
                    <Progress value={50} size="lg" className="mt-2" color="green" />
                </div>

                <hr className="my-2 border-blue-gray-50 mb-8 mt-8" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Monthly
                    </Typography>
                    <div className="flex items-center justify-between mb-4">
                        <Typography className="text-gray-900 font-medium mt-2">
                            Month
                        </Typography>
                        <Typography className="text-gray-900 font-semibold mt-2">
                            $235,15
                        </Typography>
                    </div>
                    <Progress value={80} size="lg" className="mt-2" color="green" />
                </div>

                <div className="h-8"></div>
            </CardBody>
        </Card>
    );
}