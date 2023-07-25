import {
    Card,
    CardBody,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import React from "react";

export default function AddCreditCardForm() {
    return (
        <Card className="mt-6">
            <CardBody>

                <div className="m-6">
                    <Input label="Amount" color="green" type="number" step="0.01" pattern="[0-9]*" />
                </div>

                <div className="m-6">
                    <Select label="Type" menuProps={{ className: "h-48" }} color="green">
                        <Option value="Visa">Visa</Option>
                        <Option value="MasterCard">MasterCard</Option>
                        <Option value="American Express">American Express</Option>
                        <Option value="Chase">Chase</Option>
                        <Option value="Capital One">Capital One</Option>
                        <Option value="Synchrony">Synchrony</Option>
                        <Option value="Citibank">Citibank</Option>
                        <Option value="Discover">Discover</Option>
                    </Select>
                </div>

                <div className="m-6">
                    <Input label="Bank" color="green" />
                </div>

                <div className="m-6">
                    <Input label="Note" color="green" />
                </div>

                <div className="m-6 mt-8">
                    <Button size="md" color="green" className="bg-green-700 hover:bg-green-800">Add</Button>
                </div>

            </CardBody>
        </Card>
    );
}