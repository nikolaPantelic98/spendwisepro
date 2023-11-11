import { Button, Card, CardBody } from "@material-tailwind/react";
import React, {useState} from "react";
import AddRecordAmount from "./add-record-elements/AddRecordAmount";
import AddRecordCategory from "./add-record-elements/AddRecordCategory";
import AddRecordPaymentType from "./add-record-elements/AddRecordPaymentType";
import AddRecordDateAndTime from "./add-record-elements/AddRecordDateAndTime";
import AddRecordNote from "./add-record-elements/AddRecordNote";
import AddRecordCreditCard from "./add-record-elements/AddRecordCreditCard";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function AddRecordExpense() {

    const [record, setRecord] = useState({
        amount: "",
        category: null,
        paymentType: "",
        creditCard: null,
        dateAndTime: null,
        note: ""
    });

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleAmountChange = (amount) => setRecord({...record, amount});
    const handleCategoryChange = (category) => setRecord({...record, category});
    const handlePaymentTypeChange = (paymentType) => setRecord({...record, paymentType});
    const handleCreditCardChange = (creditCard) => setRecord({...record, creditCard});
    const handleDateAndTimeChange = (dateAndTime) => setRecord({...record, dateAndTime});
    const handleNoteChange = (note) => setRecord({...record, note});

    const [selectedPaymentType, setSelectedPaymentType] = useState("CASH");

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/records/save_expense", record, { headers });
            navigate("/home", {state: {addSuccess: true}});
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
                            {/*done*/}
                            <AddRecordAmount setAmount={handleAmountChange} />

                            <AddRecordCategory setCategory={handleCategoryChange} />

                            <AddRecordPaymentType onChange={setSelectedPaymentType} setPaymentType={handlePaymentTypeChange} />

                            {selectedPaymentType === "CREDIT_CARD" && <AddRecordCreditCard setCreditCard={handleCreditCardChange} />}

                            <AddRecordDateAndTime setDateAndTime={handleDateAndTimeChange} />
                            {/*done*/}
                            <AddRecordNote setNote={handleNoteChange} />
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