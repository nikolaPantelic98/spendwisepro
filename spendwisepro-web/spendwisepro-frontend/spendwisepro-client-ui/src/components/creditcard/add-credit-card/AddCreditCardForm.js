import {
    Card,
    CardBody,
    Button,
} from "@material-tailwind/react";
import React, {useState} from "react";
import CreditCardType from "../form-elements/CreditCardType";
import CreditCardBank from "../form-elements/CreditCardBank";
import CreditCardNote from "../form-elements/CreditCardNote";
import CreditCardIcon from "../form-elements/CreditCardIcon";
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";

export default function AddCreditCardForm() {

    const [creditCard, setCreditCard] = useState({
        type: "",
        icon: null,
        bank: "",
        note: ""
    });

    const [error, setError] = useState(false);

    const location = useLocation();
    const type = location.state?.type || '';
    const note = location.state?.note || '';

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const handleTypeChange = (type) => setCreditCard({...creditCard, type});
    const handleIconChange = (icon) => setCreditCard({...creditCard, icon});
    const handleBankChange = (bank) => setCreditCard({...creditCard, bank});
    const handleNoteChange = (note) => setCreditCard({...creditCard, note});

    const handleSubmit = async (e) => { e.preventDefault();
        try {
            await axios.post("http://localhost:8000/spendwisepro/credit_cards/save", creditCard, { headers });
            navigate("/credit_cards", {state: {addSuccess: true}});
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
                            <CreditCardType setType={handleTypeChange} initialValue={type} formType="add" />

                            <CreditCardIcon setIcon={handleIconChange} />

                            <CreditCardBank setBank={handleBankChange} />

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