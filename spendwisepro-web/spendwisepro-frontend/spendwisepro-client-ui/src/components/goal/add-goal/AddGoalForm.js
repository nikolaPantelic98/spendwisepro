import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React from "react";
import AddGoalAmount from "./elements/AddGoalAmount";
import AddGoalName from "./elements/AddGoalName";
import AddGoalPeriod from "./elements/AddGoalPeriod";
import AddGoalStartDate from "./elements/AddGoalStartDate";
import AddGoalEndDate from "./elements/AddGoalEndDate";

export default function AddGoalForm() {
    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <AddGoalAmount />

                        <AddGoalName />

                        <AddGoalPeriod />

                        <AddGoalStartDate />

                        <AddGoalEndDate />
                    </ul>
                    <hr className="my-2 border-blue-gray-50" />
                    <div className="flex justify-center items-center">
                        <Button className="mt-2 w-full" variant="gradient" color="green">
                            <span>Add</span>
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}