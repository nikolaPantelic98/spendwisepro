import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardBody} from "@material-tailwind/react";
import {useNavigate, useParams} from "react-router-dom";
import AddCreditCardAmount from "./add-credit-card-elements/AddCreditCardAmount";
import AddCreditCardType from "./add-credit-card-elements/AddCreditCardType";
import AddCreditCardIcon from "./add-credit-card-elements/AddCreditCardIcon";
import AddCreditCardBank from "./add-credit-card-elements/AddCreditCardBank";
import AddCreditCardNote from "./add-credit-card-elements/AddCreditCardNote";

export default function EditCreditCardForm() {
    const [creditCard, setCreditCard] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(false);

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

    useEffect(() => {
        axios.get(`http://localhost:8000/spendwisepro/credit_cards/${id}`, { headers })
            .then(response => {
                setCreditCard(response.data);
            })
            .catch(error => console.error('Error fetching credit card:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/spendwisepro/credit_cards/edit/${id}`, creditCard, { headers });
            navigate("/credit_cards", {state: {success: true}});
        } catch (err) {
            setError(true);
            console.log("error");
        }
    }

    function navigateToCreditCards() {
        navigate("/credit_cards");
    }

    return creditCard ? (

        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200">
                            <AddCreditCardAmount setAmount={handleAmountChange} initialValue={creditCard.amount} />

                            <AddCreditCardType setType={handleTypeChange} initialValue={creditCard.type} />

                            <AddCreditCardIcon setIcon={handleIconChange} initialValue={creditCard.icon} />

                            <AddCreditCardBank setBank={handleBankChange} initialValue={creditCard.bank} />

                            <AddCreditCardNote setNote={handleNoteChange} initialValue={creditCard.note} />
                        </ul>

                        <hr className="my-2 border-blue-gray-50" />

                        <div className="flex justify-center items-center space-x-2">
                            <Button className="mt-2 w-full" variant="outlined" color="red">
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

        </Card>
    ) : null;
}