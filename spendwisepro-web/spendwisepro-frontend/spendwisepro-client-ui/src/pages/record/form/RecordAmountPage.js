import React, {useEffect, useState} from 'react';
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Button, Card, CardBody, Typography, Input} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setRecordAmount} from "../../../redux/recordSlice";

import { motion } from "framer-motion";

function RecordAmountPage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const amount = useSelector((state) => state.record.amount);
    const [inputValueAmount, setInputValueAmount] = useState(amount);
    const from = location.state?.from || '/add_record';

    useEffect(() => {
        const inputAmount = document.getElementById('inputAmount');
        inputAmount.focus();
    }, [inputValueAmount]);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await dispatch(setRecordAmount(inputValueAmount));
            navigate(from);
        }
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
                            <div className="mt-8 text-center">
                                <Card className="w-full shadow-lg">
                                    <CardBody>
                                        <Typography variant="h6" className="text-gray-800">
                                            Add Amount
                                        </Typography>
                                        <div className="h-2"></div>
                                        <Input id="inputAmount"
                                               type="number"
                                               step="0.01"
                                               value={inputValueAmount}
                                               className="border-none text-center"
                                               variant="static"
                                               onChange={(e) => setInputValueAmount(e.target.value)}
                                               onKeyDown={handleKeyDown} />
                                    </CardBody>

                                    <div className="mb-6 mt-3 mx-6">
                                        <div className="flex justify-center items-center">
                                            <Button className="w-full" variant="gradient" color="green"
                                                    onClick={async () => {
                                                        await dispatch(setRecordAmount(inputValueAmount));
                                                        navigate(from, { state: { amount: inputValueAmount } });
                                                    }}>
                                                <span>Confirm</span>
                                            </Button>
                                        </div>
                                    </div>
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

export default RecordAmountPage;