import { Button, Card, CardBody } from "@material-tailwind/react";
import React, {useContext, useState} from "react";
import RecordAmount from "../form-elements/RecordAmount";
import RecordCategory from "../form-elements/RecordCategory";
import RecordPaymentType from "../form-elements/RecordPaymentType";
import RecordDateAndTime from "../form-elements/RecordDateAndTime";
import RecordNote from "../form-elements/RecordNote";
import RecordCreditCard from "../form-elements/RecordCreditCard";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {RecordContext} from "./AddRecordTabs";

export default function AddRecordExpense() {

    const { record, setRecord } = useContext(RecordContext);

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleAmountChange = (amount) => setRecord({...record, amount});
    const handleCategoryChange = (category) => setRecord({...record, category});
    const handlePaymentTypeChange = (paymentType) => {
        if (paymentType === 'CASH') {
            setRecord({...record, paymentType, creditCard: null});
        } else {
            setRecord({...record, paymentType});
        }
    };
    const handleCreditCardChange = (creditCard) => setRecord({...record, creditCard});
    const handleDateAndTimeChange = (dateAndTime) => setRecord({...record, dateAndTime});
    const handleNoteChange = (note) => setRecord({...record, note});

    const [selectedPaymentType, setSelectedPaymentType] = useState("CASH");

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/records/save_expense", record, { headers });
            navigate("/records", {state: {addSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <RecordAmount setAmount={handleAmountChange} />

                            <RecordCategory setCategory={handleCategoryChange} />

                            <RecordPaymentType onChange={setSelectedPaymentType} setPaymentType={handlePaymentTypeChange} />

                            {record.paymentType === "CREDIT_CARD" && <RecordCreditCard setCreditCard={handleCreditCardChange} />}

                            <RecordDateAndTime setDateAndTime={handleDateAndTimeChange} />

                            <RecordNote setNote={handleNoteChange} />
                        </ul>
                        <hr className="my-2 border-blue-gray-50" />
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}