import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon, CreditCardIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function CreditCardList() {

    const [creditCards, setCreditCards] = useState([]);

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

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Your Credit Cards
                    {creditCards.length > 0 && (
                        <Link to="/add_credit_card" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2">
                                    Add
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </Typography>

                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        {creditCards.map((creditCard) => (
                            <li key={creditCard.id} className="py-3 sm:py-4">
                                <Link to={`/edit_credit_card/${creditCard.id}`}>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={creditCard.icon.iconPath}  alt={creditCard.type} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                                {creditCard.type}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {creditCard.bank}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {creditCard.note}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                {creditCard.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>
                        ))}

                        {creditCards.length === 0 && (
                            <div>
                                <div className="flex justify-center items-center flex-col mb-6">
                                    <CreditCardIcon className="w-20 h-20 text-green-600 mb-2"/>
                                    <Typography variant="h6" className="text-gray-600">
                                        You currently have no
                                    </Typography>
                                    <Typography variant="h6" className="text-gray-600">
                                        credit cards added
                                    </Typography>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Link to="/add_credit_card" onClick={storeScrollPosition} className="w-full">
                                        <Button className="w-full" variant="gradient" color="green">
                                            <span>Add credit card</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}