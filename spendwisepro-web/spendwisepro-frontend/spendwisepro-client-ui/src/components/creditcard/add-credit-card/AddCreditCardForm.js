import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React, {useEffect} from "react";
import CreditCardType from "../form-elements/CreditCardType";
import CreditCardBank from "../form-elements/CreditCardBank";
import CreditCardNote from "../form-elements/CreditCardNote";
import CreditCardIcon from "../form-elements/CreditCardIcon";
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import {setBank, setIcon, setNote, setType} from "../../../redux/creditCardSlice";
import {useReduxReset} from "../../../redux/useReduxReset";

export default function AddCreditCardForm() {

    const reduxReset = useReduxReset();

    const dispatch = useDispatch();
    const creditCard = useSelector((state) => state.creditCard);
    const { type, bank, note, icon } = creditCard;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
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

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/credit_cards/save", creditCard, { headers });
            reduxReset();
            navigate("/credit_cards", {state: {addSuccess: true}});
        } catch (err) {
            console.log("error");
        }
    }

    const updatedBank = useSelector((state) => state.creditCard.bank);
    const updatedType = useSelector((state) => state.creditCard.type);
    const updatedNote = useSelector((state) => state.creditCard.note);
    const updatedIcon = useSelector((state) => state.creditCard.icon);

    useEffect(() => {
        if (updatedBank) {
            handleBankChange(updatedBank);
        } else if (updatedType) {
            handleTypeChange(updatedType);
        } else if (updatedNote) {
            handleNoteChange(updatedNote);
        } else if (updatedIcon) {
            handleIconChange(updatedIcon);
        }
    }, [updatedBank, updatedType, updatedNote, updatedIcon]);


    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <CreditCardType setType={handleTypeChange} initialValue={type} formType="add" />

                            <CreditCardIcon setIcon={handleIconChange} initialValue={icon} formType="add" />

                            <CreditCardBank setBank={handleBankChange} initialValue={bank} formType="add" />

                            <CreditCardNote setNote={handleNoteChange} initialValue={note} formType="add" />
                        </ul>
                        <hr className="my-2 border-blue-gray-50" />
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="mt-2 w-full" variant="gradient" color="green">
                                <span>Add</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}