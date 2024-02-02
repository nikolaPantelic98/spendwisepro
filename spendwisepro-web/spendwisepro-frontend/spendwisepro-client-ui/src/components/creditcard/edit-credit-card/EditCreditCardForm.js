import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {useNavigate, useParams} from "react-router-dom";
import CreditCardAmount from "../form-elements/CreditCardAmount";
import CreditCardType from "../form-elements/CreditCardType";
import CreditCardIcon from "../form-elements/CreditCardIcon";
import CreditCardBank from "../form-elements/CreditCardBank";
import CreditCardNote from "../form-elements/CreditCardNote";
import {setAmount, setBank, setIcon, setNote, setType} from "../../../redux/creditCardSlice";
import {useDispatch, useSelector} from "react-redux";
import {useReduxReset} from "../../../redux/useReduxReset";

export default function EditCreditCardForm() {

    const [creditCardDB, setCreditCardDB] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(false);
    const reduxReset = useReduxReset();

    const dispatch = useDispatch();
    const creditCard = useSelector((state) => state.creditCard);
    const { amount, type, bank, note, icon } = creditCard;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleAmountChange = (amount) => {
        dispatch(setAmount(amount));
    };

    const handleTypeChange = (type) => {
        dispatch(setType(type));
    };

    const handleIconChange = (icon) => {
        dispatch(setIcon(icon));
    };

    const handleBankChange = (bank) => {
        dispatch(setBank(bank));
    };

    const handleNoteChange = (note) => {
        dispatch(setNote(note));
    };

    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const handleOpenDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(true);
    const handleCloseDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/spendwisepro/credit_cards/${id}`, { headers })
            .then(response => {
                setCreditCardDB(response.data);
            })
            .catch(error => console.error('Error fetching credit card:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/credit_cards/edit/${id}`, creditCard, { headers });
            reduxReset();
            navigate("/credit_cards", {state: {updateSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    const updatedAmount = useSelector((state) => state.creditCard.amount);
    const updatedBank = useSelector((state) => state.creditCard.bank);
    const updatedType = useSelector((state) => state.creditCard.type);
    const updatedNote = useSelector((state) => state.creditCard.note);
    const updatedIcon = useSelector((state) => state.creditCard.icon);

    useEffect(() => {
        if (updatedBank) {
            handleBankChange(updatedBank);
        }
        if (updatedType) {
            handleTypeChange(updatedType);
        }
        if (updatedNote) {
            handleNoteChange(updatedNote);
        }
        if (updatedIcon) {
            handleIconChange(updatedIcon);
        }
        if (updatedAmount) {
            handleAmountChange(updatedAmount);
        }
    }, [updatedBank, updatedType, updatedNote, updatedIcon, updatedAmount]);

    const deleteCreditCard = () => {
        axios.delete(`http://localhost:8000/spendwisepro/credit_cards/delete/${id}`, { headers })
            .then(() => {
                navigate("/credit_cards", {state: {deleteSuccess: true}});
            })
            .catch(error => console.error('Error deleting credit card:', error));
        handleCloseDeleteConfirmationDialog();
    }

    function navigateToCreditCards() {
        navigate("/credit_cards");
    }


    return creditCardDB ? (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                            <CreditCardAmount setAmount={handleAmountChange} initialValue={amount !== 0 ? amount : creditCardDB.amount} formType="edit" id={id} />

                            <CreditCardType setType={handleTypeChange} initialValue={type !== "" ? type : creditCardDB.type} formType="edit" id={id} />

                            <CreditCardIcon setIcon={handleIconChange} initialValue={icon !== null ? icon : creditCardDB.icon} formType="edit" id={id} />

                            <CreditCardBank setBank={handleBankChange} initialValue={bank !== "" ? bank : creditCardDB.bank} formType="edit" id={id} />

                            <CreditCardNote setNote={handleNoteChange} initialValue={note !== "" ? note : creditCardDB.note} formType="edit" id={id} />
                        </ul>

                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center space-x-2">
                            <Button onClick={handleOpenDeleteConfirmationDialog} className="mt-2 w-full" variant="outlined" color="red">
                                <span>Delete</span>
                            </Button>
                            <Button className="mt-2 w-full" variant="outlined" color="green" onClick={() => {
                                navigateToCreditCards();
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
                        onClick={deleteCreditCard}
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