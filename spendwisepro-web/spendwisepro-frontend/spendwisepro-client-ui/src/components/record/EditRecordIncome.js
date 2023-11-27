import {
    Button,
    Card,
    CardBody,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography
} from "@material-tailwind/react";
import React, {useContext, useEffect, useState} from "react";
import AddRecordAmount from "./add-record-elements/AddRecordAmount";
import AddRecordCategory from "./add-record-elements/AddRecordCategory";
import AddRecordPaymentType from "./add-record-elements/AddRecordPaymentType";
import AddRecordDateAndTime from "./add-record-elements/AddRecordDateAndTime";
import AddRecordNote from "./add-record-elements/AddRecordNote";
import AddRecordCreditCard from "./add-record-elements/AddRecordCreditCard";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {RecordContext} from "./AddRecordTabs";
import {ArrowPathIcon} from "@heroicons/react/24/solid";

export default function EditRecordIncome() {

    const { record, setRecord } = useContext(RecordContext);
    const { id } = useContext(RecordContext);

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/spendwisepro/records/${id}`, { headers })
            .then(response => {
                setRecord(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching record:', error);
                setIsLoading(false);
            });
    }, [id]);

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

    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const handleOpenDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(true);
    const handleCloseDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(false);

    const [selectedPaymentType, setSelectedPaymentType] = useState("CASH");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/records/edit_income/${id}`, record, { headers });
            navigate("/records", {state: {updateSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    const deleteRecord = () => {
        axios.delete(`http://localhost:8000/spendwisepro/records/delete/${id}`, { headers })
            .then(() => {
                navigate("/records", {state: {deleteSuccess: true}});
            })
            .catch(error => console.error('Error deleting record:', error));
        handleCloseDeleteConfirmationDialog();
    }

    function navigateBack() {
        navigate(-1);
    }

    useEffect(() => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem('scrollPosition');
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    if (isLoading) {
        return (
            <Card className="w-full h-1/3 shadow-lg mt-8">
                <CardBody>
                    <div>
                        <div className="flex justify-center items-center flex-col mb-3">
                            <ArrowPathIcon className="w-8 h-8 text-green-600 mb-2"/>
                            <Typography className="text-gray-600 text-sm font-semibold">
                                Loading...
                            </Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <AddRecordAmount setAmount={handleAmountChange} />

                            <AddRecordCategory setCategory={handleCategoryChange} />

                            <AddRecordPaymentType onChange={setSelectedPaymentType} setPaymentType={handlePaymentTypeChange} />

                            {record && record.paymentType === "CREDIT_CARD" && <AddRecordCreditCard setCreditCard={handleCreditCardChange} />}

                            <AddRecordDateAndTime setDateAndTime={handleDateAndTimeChange} />

                            <AddRecordNote setNote={handleNoteChange} />
                        </ul>
                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center space-x-2">
                            <Button onClick={handleOpenDeleteConfirmationDialog} className="mt-2 w-full" variant="outlined" color="red">
                                <span>Delete</span>
                            </Button>
                            <Button onClick={navigateBack} className="mt-2 w-full" variant="outlined" color="green">
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
                    Do you really want to delete this record? This process cannot be undone.
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
    );
}