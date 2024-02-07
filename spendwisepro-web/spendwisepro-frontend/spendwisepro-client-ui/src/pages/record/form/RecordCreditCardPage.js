import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Avatar, Button, Card, CardBody, ListItem, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import axios from "axios";
import {ChevronRightIcon, CreditCardIcon} from "@heroicons/react/24/outline";
import {setRecordCreditCard} from "../../../redux/recordSlice";

import { motion } from "framer-motion";

function RecordCreditCardPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/add_record';

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

    const handleSelectCreditCard = async (creditCard) => {
        await dispatch(setRecordCreditCard(creditCard));
        navigate(from, { state: { creditCard: creditCard } });
    };

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }


    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title={from === '/add_record' ? "Add record" : "Edit record"} resetRedux={false} />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">

                    <motion.div initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.3}}} className="mt-2">

                        <div className="mx-6">
                            <div className="mt-6 text-center">
                                <Card className="w-full shadow-lg">
                                    <CardBody>
                                        <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                                            Add credit card
                                        </Typography>
                                        <hr className="my-1 border-blue-gray-50" />

                                        <div className="flow-root">
                                            <ul role="list" className="divide-y divide-gray-200">

                                                {creditCards.map((creditCard) => (
                                                    <li key={creditCard.id} className="py-3 sm:py-4">
                                                        <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                                                                  onClick={() => handleSelectCreditCard(creditCard)}>
                                                            <div className="flex-shrink-0">
                                                                <Avatar className="w-8 h-8 rounded-full" src={creditCard.icon.iconPath} alt={creditCard.icon.iconPath}/>
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-md font-medium text-gray-900 truncate">
                                                                    {creditCard.type.length > 20 ? creditCard.type.substring(0, 17) + "..." : creditCard.type}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {creditCard.bank.length > 20 ? creditCard.bank.substring(0, 17) + "..." : creditCard.bank}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {creditCard.note.length > 20 ? creditCard.note.substring(0, 17) + "..." : creditCard.note}
                                                                </p>
                                                            </div>

                                                            <div className="ml-2">
                                                                <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                            </div>
                                                        </ListItem>
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
                            </div>
                        </div>

                        <div><PageWidthLayout/></div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default RecordCreditCardPage;