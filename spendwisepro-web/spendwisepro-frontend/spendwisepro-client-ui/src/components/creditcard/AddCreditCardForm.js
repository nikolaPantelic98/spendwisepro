import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React from "react";
import AddCreditCardType from "./add-credit-card-elements/AddCreditCardType";
import AddCreditCardBank from "./add-credit-card-elements/AddCreditCardBank";
import AddCreditCardNote from "./add-credit-card-elements/AddCreditCardNote";

export default function AddCreditCardForm() {
    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <AddCreditCardType />

                        <AddCreditCardBank />

                        <AddCreditCardNote />
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