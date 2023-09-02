import {
    Card,
    CardBody,
    Typography,
    Button
} from "@material-tailwind/react";
import React from "react";
import {Link} from "react-router-dom";
import {CircleStackIcon} from "@heroicons/react/24/outline";

export default function GoalWeeklyAddSavedAmount() {

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div>
                    <div className="flex justify-center items-center flex-col mb-6">
                        <CircleStackIcon className="w-20 h-20 text-green-600 mb-2"/>
                        <Typography variant="h6" className="text-gray-600">
                            Have you saved money
                        </Typography>
                        <Typography variant="h6" className="text-gray-600">
                            for this goal?
                        </Typography>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link className="w-full">
                            <Button className="w-full" variant="gradient" color="green">
                                <span>Add saved amount</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}