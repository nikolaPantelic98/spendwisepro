import { Button, Card, CardBody } from "@material-tailwind/react";
import React, {useState} from "react";
import AddRecordAmount from "./add-record-elements/AddRecordAmount";
import AddRecordCategory from "./add-record-elements/AddRecordCategory";
import AddRecordPaymentType from "./add-record-elements/AddRecordPaymentType";
import AddRecordDateAndTime from "./add-record-elements/AddRecordDateAndTime";
import AddRecordNote from "./add-record-elements/AddRecordNote";
import AddRecordCreditCard from "./add-record-elements/AddRecordCreditCard";

export default function AddRecordIncome() {

    const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <AddRecordAmount />

                        <AddRecordCategory />

                        <AddRecordPaymentType onChange={setSelectedPaymentType} />

                        {selectedPaymentType === "Credit Card" && <AddRecordCreditCard />}

                        <AddRecordDateAndTime />

                        <AddRecordNote />
                    </ul>
                    <hr className="my-2 border-blue-gray-50" />
                    <div className="flex justify-center items-center">
                        <Button className="mt-2 w-full" variant="gradient" color="green">
                            <span>Save</span>
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}