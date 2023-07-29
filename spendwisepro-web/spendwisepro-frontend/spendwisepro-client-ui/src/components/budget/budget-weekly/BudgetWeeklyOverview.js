import {
    Card,
    CardBody,
    Typography,
    ListItem, Chip,
} from "@material-tailwind/react";
import React from "react";
import { Progress } from "@material-tailwind/react";

export default function BudgetWeeklyOverview() {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="py-3 sm:py-4">
                            <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                <div className="flex-1 w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <Typography variant="h4" className="text-gray-900 font-bold mt-2 truncate">
                                            $140,00
                                        </Typography>
                                        <div className="flex gap-4 items-center">
                                            <Chip size="md" value="50%" variant="ghost" className="bg-gray-200 text-gray-900 font-semibold mt-2 text-sm" />
                                        </div>
                                    </div>
                                    <Progress value={50} size="lg" className="mt-2 mb-2" color="green" />
                                    <div className="flex justify-between">
                                        <Typography className=" font-semibold text-gray-800">$70,00</Typography>
                                        <Typography className=" font-semibold text-green-800">$70,00</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography className="text-sm font-medium text-gray-600">Spent</Typography>
                                        <Typography className="text-sm font-medium text-gray-600">Remains</Typography>
                                    </div>
                                </div>
                            </ListItem>
                        </li>
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}