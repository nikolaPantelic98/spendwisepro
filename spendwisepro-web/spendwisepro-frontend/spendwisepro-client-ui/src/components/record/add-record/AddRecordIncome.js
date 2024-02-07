import { Button, Card, CardBody } from "@material-tailwind/react";
import React, {useContext, useEffect, useState} from "react";
import RecordAmount from "../form-elements/RecordAmount";
import RecordCategory from "../form-elements/RecordCategory";
import RecordPaymentType from "../form-elements/RecordPaymentType";
import RecordDateAndTime from "../form-elements/RecordDateAndTime";
import RecordNote from "../form-elements/RecordNote";
import RecordCreditCard from "../form-elements/RecordCreditCard";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {RecordContext} from "./AddRecordTabs";
import {useReduxReset} from "../../../redux/useReduxReset";
import {useDispatch, useSelector} from "react-redux";
import {
    setRecordAmount,
    setRecordCategory,
    setRecordCreditCard,
    setRecordDateAndTime, setRecordNote, setRecordPaymentType, setSelectedTab
} from "../../../redux/recordSlice";

export default function AddRecordIncome() {

    const { record } = useContext(RecordContext);
    const reduxReset = useReduxReset();

    const dispatch = useDispatch();
    const { amount, category, paymentType, creditCard, dateAndTime, note } = record;
    const selectedTab = useSelector((state) => state.record.selectedTab);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleAmountChange = (amount) => {
        dispatch(setRecordAmount(amount));
    };

    const handleCategoryChange = (category) => {
        dispatch(setRecordCategory(category));
    };

    const handleCreditCardChange = (creditCard) => {
        dispatch(setRecordCreditCard(creditCard));
    };

    const handleDateAndTimeChange = (dateAndTime) => {
        dispatch(setRecordDateAndTime(dateAndTime));
    };

    const handleNoteChange = (note) => {
        dispatch(setRecordNote(note));
    };

    const handlePaymentTypeChange = (paymentType) => {
        if (paymentType === 'CASH') {
            dispatch(setRecordCreditCard(null));
            dispatch(setRecordPaymentType(paymentType));
        } else {
            dispatch(setRecordPaymentType(paymentType));
        }
    };

    const [selectedPaymentType, setSelectedPaymentType] = useState("Cash");

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/records/save_income", record, { headers });
            reduxReset();
            navigate("/records", {state: {addSuccess: true}});
        } catch (err) {
            console.log("error");
        }
    }

    const updatedAmount = useSelector((state) => state.record.amount);
    const updatedCategory = useSelector((state) => state.record.category);
    const updatedPaymentType = useSelector((state) => state.record.paymentType);
    const updatedCreditCard = useSelector((state) => state.record.creditCard);
    const updatedDateAndTime = useSelector((state) => state.record.dateAndTime);
    const updatedNote = useSelector((state) => state.record.note);

    useEffect(() => {
        if (updatedAmount) {
            handleAmountChange(updatedAmount);
        } else if (updatedCategory) {
            handleCategoryChange(updatedCategory);
        } else if (updatedPaymentType) {
            handlePaymentTypeChange(updatedPaymentType);
        } else if (updatedCreditCard) {
            handleCreditCardChange(updatedCreditCard);
        } else if (updatedDateAndTime) {
            handleDateAndTimeChange(updatedDateAndTime);
        } else if (updatedNote) {
            handleNoteChange(updatedNote);
        }
    }, [updatedAmount, updatedCategory, updatedPaymentType, updatedCreditCard, updatedDateAndTime, updatedNote]);

    useEffect(() => {
        dispatch(setSelectedTab(selectedTab));
    }, []);


    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <RecordAmount setRecordAmount={handleAmountChange} initialValue={amount} formType="add" />

                            <RecordCategory setRecordCategory={handleCategoryChange} initialValue={category} formType="add" />

                            <RecordPaymentType setRecordPaymentType={handlePaymentTypeChange} initialValue={paymentType} formType="add" />

                            {paymentType === "CREDIT_CARD" && <RecordCreditCard setRecordCreditCard={handleCreditCardChange} initialValue={creditCard} formType="add" />}

                            <RecordDateAndTime setRecordDateAndTime={handleDateAndTimeChange} initialValue={dateAndTime} formType="add" />

                            <RecordNote setRecordNote={handleNoteChange} initialValue={note} formType="add" />
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