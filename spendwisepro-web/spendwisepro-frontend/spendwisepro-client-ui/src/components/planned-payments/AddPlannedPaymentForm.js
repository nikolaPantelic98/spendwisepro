import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React, {useState} from "react";
import AddPlannedPaymentAmount from "./add-planned-payment-elements/AddPlannedPaymentAmount";
import AddPlannedPaymentName from "./add-planned-payment-elements/AddPlannedPaymentName";
import AddPlannedPaymentCategory from "./add-planned-payment-elements/AddPlannedPaymentCategory";
import AddPlannedPaymentType from "./add-planned-payment-elements/AddPlannedPaymentType";
import AddPlannedPaymentCreditCard from "./add-planned-payment-elements/AddPlannedPaymentCreditCard";
import AddPlannedPaymentDate from "./add-planned-payment-elements/AddPlannedPaymentDate";

export default function AddPlannedPaymentForm() {

    const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <AddPlannedPaymentAmount />

                        <AddPlannedPaymentName />

                        <AddPlannedPaymentCategory />

                        <AddPlannedPaymentType onChange={setSelectedPaymentType} />

                        {selectedPaymentType === "Credit Card" && <AddPlannedPaymentCreditCard />}

                        <AddPlannedPaymentDate />
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