import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React, {useState} from "react";
import PlannedPaymentAmount from "../form-elements/PlannedPaymentAmount";
import PlannedPaymentName from "../form-elements/PlannedPaymentName";
import PlannedPaymentCategory from "../form-elements/PlannedPaymentCategory";
import PlannedPaymentType from "../form-elements/PlannedPaymentType";
import PlannedPaymentCreditCard from "../form-elements/PlannedPaymentCreditCard";
import PlannedPaymentDate from "../form-elements/PlannedPaymentDate";

export default function AddPlannedPaymentForm() {

    const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <PlannedPaymentAmount />

                        <PlannedPaymentName />

                        <PlannedPaymentCategory />

                        <PlannedPaymentType onChange={setSelectedPaymentType} />

                        {selectedPaymentType === "Credit Card" && <PlannedPaymentCreditCard />}

                        <PlannedPaymentDate />
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