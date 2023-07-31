import {
    Card,
    CardBody,
    Typography,
    Chip, Button,
} from "@material-tailwind/react";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

export default function BudgetWeeklyOverview() {

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
                                        $140,00
                                    </Typography>
                                    <Button size="sm" variant="text" className="mt-1">
                                        <PencilSquareIcon strokeWidth={2} className="w-6 h-6" />
                                    </Button>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Chip size="md" value="50%" variant="ghost" className="bg-gray-200 text-gray-900 font-semibold mt-2 text-sm" />
                                </div>
                            </div>
                            <Progress value={50} size="lg" className="mt-2 mb-2" color="green" />
                            <div className="flex justify-between">
                                <Typography className="font-semibold text-gray-800">$70,00</Typography>
                                <Typography className="font-semibold text-green-800">$70,00</Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography className="text-sm font-medium text-gray-600">Spent</Typography>
                                <Typography className="text-sm font-medium text-gray-600">Remains</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}