import {
    Card,
    CardBody,
    Typography,
    Chip,
} from "@material-tailwind/react";
import React from "react";
import { Progress } from "@material-tailwind/react";

export default function ExpensesOverviewWeek() {

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 w-0">
                            <Typography  className="uppercase text-sm font-medium text-gray-700">
                                Last 7 days
                            </Typography>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Typography variant="h4" className="text-gray-900 font-bold mt-2 truncate">
                                        $270,00
                                    </Typography>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Chip size="md" value="Total" variant="ghost" className="bg-gray-200 normal-case text-gray-900 font-semibold mt-2 text-sm" />
                                </div>
                            </div>
                            <Progress value={100} size="lg" className="mt-2 mb-2" color="green" />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}