import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useReduxReset} from "../../../redux/useReduxReset";
import {
    setRecordAmount,
    setRecordCategory,
    setRecordCreditCard,
    setRecordDateAndTime,
    setRecordNote,
    setRecordPaymentType, setRecordTransactionType
} from "../../../redux/recordSlice";
import RecordAmount from "../form-elements/RecordAmount";
import RecordCategory from "../form-elements/RecordCategory";
import RecordPaymentType from "../form-elements/RecordPaymentType";
import RecordDateAndTime from "../form-elements/RecordDateAndTime";
import RecordNote from "../form-elements/RecordNote";
import RecordCreditCard from "../form-elements/RecordCreditCard";
import RecordTransactionType from "../form-elements/RecordTransactionType";
import getData from "../../../api/axiosInstance";

export default function EditRecordForm() {

    const [recordDB, setRecordDB] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(false);
    const reduxReset = useReduxReset();

    const dispatch = useDispatch();
    const record = useSelector((state) => state.record);
    const { transactionType, amount, category, paymentType, creditCard, dateAndTime, note } = record;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleTransactionTypeChange = (transactionType) => {
        dispatch(setRecordTransactionType(transactionType));
    };

    const handleAmountChange = (amount) => {
        dispatch(setRecordAmount(amount));
    };

    const handleCategoryChange = (category) => {
        dispatch(setRecordCategory(category));
    };

    const handlePaymentTypeChange = (paymentType) => {
        if (paymentType === 'CASH') {
            dispatch(setRecordCreditCard(null));
            dispatch(setRecordPaymentType(paymentType));
        } else {
            dispatch(setRecordPaymentType(paymentType));
        }
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

    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const handleOpenDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(true);
    const handleCloseDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(false);

    useEffect(() => {
        getData(
            `/records/${id}`,
            headers,
            setRecordDB,
            "Error fetching record"
        )
    }, [id]);

    const handleSubmitIncome = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/records/edit_income/${id}`, record, { headers });
            reduxReset();
            navigate("/records", {state: {updateSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    const handleSubmitExpense = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/records/edit_expense/${id}`, record, { headers });
            reduxReset();
            navigate("/records", {state: {updateSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transactionType === 'EXPENSE') {
            handleSubmitExpense(e);
        } else if (transactionType === 'INCOME') {
            handleSubmitIncome(e);
        }
    };

    const updatedTransactionType = useSelector(state => state.record.transactionType)
    const updatedAmount = useSelector((state) => state.record.amount);
    const updatedCategory = useSelector((state) => state.record.category);
    const updatedPaymentType = useSelector((state) => state.record.paymentType);
    const updatedCreditCard = useSelector((state) => state.record.creditCard);
    const updatedDateAndTime = useSelector((state) => state.record.dateAndTime);
    const updatedNote = useSelector((state) => state.record.note);

    useEffect(() => {
        if (updatedTransactionType) {
            handleTransactionTypeChange(updatedTransactionType);
        }
        if (updatedAmount) {
            handleAmountChange(updatedAmount);
        }
        if (updatedCategory) {
            handleCategoryChange(updatedCategory);
        }
        if (updatedPaymentType) {
            handlePaymentTypeChange(updatedPaymentType);
        }
        if (updatedCreditCard) {
            handleCreditCardChange(updatedCreditCard);
        }
        if (updatedDateAndTime) {
            handleDateAndTimeChange(updatedDateAndTime);
        }
        if (updatedNote) {
            handleNoteChange(updatedNote);
        }
    }, [updatedAmount, updatedCategory, updatedPaymentType, updatedCreditCard, updatedDateAndTime, updatedNote]);

    const deleteRecord = () => {
        axios.delete(`http://localhost:8000/spendwisepro/records/delete/${id}`, { headers })
            .then(() => {
                navigate("/records", {state: {deleteSuccess: true}});
            })
            .catch(error => console.error('Error deleting record:', error));
        handleCloseDeleteConfirmationDialog();
    }

    function navigateToRecords() {
        navigate("/records");
    }


    return recordDB ? (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                            <RecordTransactionType setTransactionType={handleTransactionTypeChange} initialValue={transactionType !== "" ? transactionType : recordDB.transactionType} formType="edit" id={id} />

                            <RecordAmount setAmount={handleAmountChange} initialValue={amount !== 0 ? amount : recordDB.amount} formType="edit" id={id} />

                            <RecordCategory setCategory={handleCategoryChange} initialValue={category !== null ? category : recordDB.category} formType="edit" id={id} />

                            <RecordPaymentType setPaymentType={handlePaymentTypeChange} initialValue={paymentType !== "" ? paymentType : recordDB.paymentType} formType="edit" id={id} />

                            {record && record.paymentType === "CREDIT_CARD" && <RecordCreditCard setCreditCard={handleCreditCardChange} initialValue={creditCard !== null ? creditCard : recordDB.creditCard} formType="edit" id={id} />}

                            <RecordDateAndTime setDateAndTime={handleDateAndTimeChange} initialValue={dateAndTime !== null ? dateAndTime : recordDB.dateAndTime} formType="edit" id={id} />

                            <RecordNote setNote={handleNoteChange} initialValue={note !== "" ? note : recordDB.note} formType="edit" id={id} />
                        </ul>

                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center space-x-2">
                            <Button onClick={handleOpenDeleteConfirmationDialog} className="mt-2 w-full" variant="outlined" color="red">
                                <span>Delete</span>
                            </Button>
                            <Button className="mt-2 w-full" variant="outlined" color="green" onClick={() => {
                                navigateToRecords();
                                reduxReset();
                            }}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                </form>

            </CardBody>

            <Dialog
                open={openDeleteConfirmationDialog}
                handler={handleCloseDeleteConfirmationDialog}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Are you sure?</DialogHeader>
                <DialogBody>
                    Do you really want to delete this credit card? All associated records and planned payments will be lost forever.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={deleteRecord}
                        className="mr-1"
                    >
                        <span>Delete</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleCloseDeleteConfirmationDialog}>
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </Card>
    ) : null;
}