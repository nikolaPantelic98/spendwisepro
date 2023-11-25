import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    ListItem, Option, Select
} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {RecordContext} from "../AddRecordTabs";

export default function AddRecordCreditCard({ setCreditCard }) {

    const { record } = useContext(RecordContext);

    const [openCreditCard, setOpenCreditCard] = React.useState(false);
    const [selectedCreditCard, setSelectedCreditCard] = React.useState(record.creditCard);
    const [tempSelectedCreditCard, setTempSelectedCreditCard] = React.useState("");
    const [creditCards, setCreditCards] = useState([]);

    const handleOpenCreditCard = () => {
        setTempSelectedCreditCard(selectedCreditCard);
        setOpenCreditCard(true);
    };
    const handleCloseCreditCard = () => {
        setSelectedCreditCard(null);
        setCreditCard(null);
        setOpenCreditCard(false);
    };

    const handleConfirmCreditCard = () => {
        setCreditCard(selectedCreditCard);
        setOpenCreditCard(false);
        setTempSelectedCreditCard("");
    };
    const handleCreditCardChange = (value) => {
        setSelectedCreditCard(value);
    }

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/credit_cards/all', { headers })
            .then(response => {
                setCreditCards(response.data);
            })
            .catch(error => console.error('Error fetching credit cards:', error));
    }, []);

    useEffect(() => {
        setSelectedCreditCard(record.creditCard);
    }, [record.creditCard]);

    return (
        <li className="py-3 sm:py-4">
            <div onClick={handleOpenCreditCard}>
                <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://www.pngitem.com/pimgs/m/544-5444157_credit-card-icons-png-credit-card-icon-green.png" alt="Credit card" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-700 truncate dark:text-white">
                            Credit Card
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="h-4"></div>
                        <div className={`text-sm truncate dark:text-gray-400 ${selectedCreditCard ? 'font-bold text-gray-500' : 'text-gray-500'}`}>
                            {selectedCreditCard ? (selectedCreditCard.type.length > 14 ? selectedCreditCard.type.substring(0, 11) + "..." : selectedCreditCard.type) : "Select"}
                        </div>
                        <div className="h-4"></div>
                    </div>
                    <div className="ml-2">
                        <ChevronRightIcon className="h-5 w-5 text-green-800" />
                    </div>
                </ListItem>
            </div>
            <Dialog
                open={openCreditCard}
                handler={handleOpenCreditCard}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Credit card</DialogHeader>
                <DialogBody>
                    <Select
                        label="Credit card"
                        color="green"
                        size="lg"
                        value={tempSelectedCreditCard}
                        onChange={handleCreditCardChange}
                        className="relative"
                    >
                        {creditCards.map((creditCard) => (
                            <Option value={creditCard} key={creditCard.id}>
                                <div className="flex items-center">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={creditCard.icon.iconPath}
                                        alt={creditCard.icon.image}
                                    />
                                    <span className="ml-3">{creditCard.type} - {creditCard.note}</span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseCreditCard}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirmCreditCard}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </li>
    );
}