import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React from "react";
import AddBudgetName from "./add-budget-elements/AddBudgetName";
import AddBudgetPeriod from "./add-budget-elements/AddBudgetPeriod";
import AddBudgetAmount from "./add-budget-elements/AddBudgetAmount";
import AddBudgetCategory from "./add-budget-elements/AddBudgetCategory";

export default function AddBudgetForm() {
    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <AddBudgetAmount />

                        <AddBudgetName />

                        <AddBudgetPeriod />

                        <AddBudgetCategory />
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