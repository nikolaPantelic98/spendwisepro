import {
    Card,
    CardBody,
    Typography,
    Chip, Button,
} from "@material-tailwind/react";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

export default function GoalWeeklyOverview() {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Typography variant="h4" className="text-gray-900 font-bold mt-2 truncate">
                                        $100,00
                                    </Typography>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Chip size="md" value="80%" variant="ghost" className="bg-gray-200 text-gray-900 font-semibold mt-2 text-sm" />
                                </div>
                            </div>
                            <Progress value={80} size="lg" className="mt-2 mb-2" color="orange" />
                            <div className="flex justify-between">
                                <Typography className="font-semibold text-green-800">$80,00</Typography>
                                <Typography className="font-semibold text-gray-800">$20,00</Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography className="text-sm font-medium text-gray-600">Saved</Typography>
                                <Typography className="text-sm font-medium text-gray-600">To save</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}