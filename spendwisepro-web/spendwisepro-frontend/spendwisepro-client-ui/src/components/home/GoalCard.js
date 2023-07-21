import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";

export default function GoalCard() {
    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Goals
                    <Button size="sm" variant="text" className="flex gap-2">
                        <a>
                            Show more
                        </a>
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-8" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Vacation
                    </Typography>
                    <div className="flex items-center justify-between mb-2">
                        <Typography className="text-gray-900 font-medium mt-2">
                            Week
                        </Typography>
                        <Typography className="text-gray-900 font-semibold mt-2">
                            $40,00
                        </Typography>
                    </div>
                    <Progress value={65} size="lg" className="mt-2" color="green" />
                </div>

                <hr className="my-2 border-blue-gray-50 mb-8 mt-8" />

                <div>
                    <Typography variant="h6" className="text-gray-900">
                        Car
                    </Typography>
                    <div className="flex items-center justify-between mb-2">
                        <Typography className="text-gray-900 font-medium mt-2">
                            Month
                        </Typography>
                        <Typography className="text-gray-900 font-semibold mt-2">
                            $400,00
                        </Typography>
                    </div>
                    <Progress value={20} size="lg" className="mt-2" color="green" />
                </div>

                <div className="h-8"></div>
            </CardBody>
        </Card>
    );
}