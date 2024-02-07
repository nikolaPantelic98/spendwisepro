import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Avatar, Card, CardBody, ListItem, Typography} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {setRecordPaymentType} from "../../../redux/recordSlice";

import { motion } from "framer-motion";

function RecordPaymentTypePage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/add_record';

    const handleCashPaymentType = async () => {
        await dispatch(setRecordPaymentType("CASH"));
        navigate(from);
    };

    const handleCreditCardPaymentType = async () => {
        await dispatch(setRecordPaymentType("CREDIT_CARD"));
        navigate(from);
    };

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
                                            Add payment type
                                        </Typography>
                                        <hr className="my-1 border-blue-gray-50" />

                                        <div className="flow-root">
                                            <ul role="list" className="divide-y divide-gray-200">

                                                <li className="py-3 sm:py-4">
                                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                                                              onClick={() => handleCashPaymentType()}>
                                                        <div className="flex-shrink-0">
                                                            <Avatar className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1028/1028137.png" alt="Cash"/>
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                Cash
                                                            </p>
                                                        </div>

                                                        <div className="ml-2">
                                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                        </div>
                                                    </ListItem>
                                                </li>

                                                <li className="py-3 sm:py-4">
                                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50"
                                                              onClick={() => handleCreditCardPaymentType()}>
                                                        <div className="flex-shrink-0">
                                                            <Avatar className="w-8 h-8 rounded-full" src="https://www.pngitem.com/pimgs/m/544-5444157_credit-card-icons-png-credit-card-icon-green.png" alt="Credit card"/>
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                Credit Card
                                                            </p>
                                                        </div>

                                                        <div className="ml-2">
                                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                                        </div>
                                                    </ListItem>
                                                </li>
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

export default RecordPaymentTypePage;