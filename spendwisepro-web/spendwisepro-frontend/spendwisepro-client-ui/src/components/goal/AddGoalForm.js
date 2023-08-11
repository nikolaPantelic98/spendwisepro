import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React from "react";
import AddGoalAmount from "./add-goal-elements/AddGoalAmount";
import AddGoalName from "./add-goal-elements/AddGoalName";
import AddGoalPeriod from "./add-goal-elements/AddGoalPeriod";
import AddGoalStartDate from "./add-goal-elements/AddGoalStartDate";
import AddGoalEndDate from "./add-goal-elements/AddGoalEndDate";

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