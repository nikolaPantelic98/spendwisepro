import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CreditCardAmount from "../form-elements/CreditCardAmount";
import CreditCardType from "../form-elements/CreditCardType";
import CreditCardIcon from "../form-elements/CreditCardIcon";
import CreditCardBank from "../form-elements/CreditCardBank";
import CreditCardNote from "../form-elements/CreditCardNote";

export default function EditCreditCardForm() {
    const [creditCard, setCreditCard] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(false);

    const location = useLocation();
    let type = location.state ? location.state.type : creditCard ? creditCard.type : '';
    const typeRef = useRef(type);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleAmountChange = (amount) => setCreditCard({...creditCard, amount});
    const handleTypeChange = (type) => setCreditCard({...creditCard, type});
    const handleIconChange = (icon) => setCreditCard({...creditCard, icon});
    const handleBankChange = (bank) => setCreditCard({...creditCard, bank});
    const handleNoteChange = (note) => setCreditCard({...creditCard, note});

    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const handleOpenDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(true);
    const handleCloseDeleteConfirmationDialog = () => setOpenDeleteConfirmationDialog(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/spendwisepro/credit_cards/${id}`, { headers })
            .then(response => {
                setCreditCard(response.data);
            })
            .catch(error => console.error('Error fetching credit card:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCreditCard = {...creditCard, type: typeRef.current};
        try {
            await axios.put(`http://localhost:8000/spendwisepro/credit_cards/edit/${id}`, updatedCreditCard, { headers });
            navigate("/credit_cards", {state: {updateSuccess: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

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

    useEffect(() => {
        typeRef.current = type;
    }, [type]);


    return creditCard ? (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                            <CreditCardAmount setAmount={handleAmountChange} initialValue={creditCard.amount} />

                            <CreditCardType setType={(value) => { type = value; handleTypeChange(value); }} initialValue={type} formType="edit" id={id} />

                            <CreditCardIcon setIcon={handleIconChange} initialValue={creditCard.icon} />

                            <CreditCardBank setBank={handleBankChange} initialValue={creditCard.bank} />

                            <CreditCardNote setNote={handleNoteChange} initialValue={creditCard.note} />
                        </ul>

                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center space-x-2">
                            <Button onClick={handleOpenDeleteConfirmationDialog} className="mt-2 w-full" variant="outlined" color="red">
                                <span>Delete</span>
                            </Button>
                            <Button onClick={navigateToCreditCards} className="mt-2 w-full" variant="outlined" color="green">
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