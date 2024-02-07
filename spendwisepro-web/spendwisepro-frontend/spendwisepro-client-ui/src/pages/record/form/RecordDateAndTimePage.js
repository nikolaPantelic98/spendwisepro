import React, {useEffect, useState} from 'react';
import Menu from "../../../components/common/Menu";
import PageHeader from "../../../components/common/PageHeader";
import {Button, Card, CardBody, Typography, Input} from "@material-tailwind/react";
import PageWidthLayout from "../../../components/common/PageWidthLayout";
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setRecordDateAndTime} from "../../../redux/recordSlice";
import moment from "moment-timezone";

import { motion } from "framer-motion";

function RecordDateAndTimePage() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const dateAndTime = useSelector((state) => state.record.dateAndTime);
    const [inputValueDateAndTime, setInputValueDateAndTime] = useState(dateAndTime);
    const from = location.state?.from || '/add_record';

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const utcDate = moment(inputValueDateAndTime).utc().format();
            await dispatch(setRecordDateAndTime(utcDate));
            navigate(from);
        }
    };

    const handleInputChange = (e) => {
        const dateTimeInUserTimezone = moment(e.target.value).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DDTHH:mm');
        setInputValueDateAndTime(dateTimeInUserTimezone);
    };

    useEffect(() => {
        let dateTimeString;
        if (dateAndTime) {
            dateTimeString = moment(dateAndTime).format('YYYY-MM-DDTHH:mm');
        } else {
            const currentDateTime = moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
            dateTimeString = currentDateTime.format('YYYY-MM-DDTHH:mm');
        }
        setInputValueDateAndTime(dateTimeString);
    }, [dateAndTime]);


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
                                            Add Date and Time
                                        </Typography>
                                        <div className="h-2"></div>
                                        <Input id="inputAmount"
                                               type="datetime-local"
                                               value={inputValueDateAndTime}
                                               className="border-none text-center"
                                               variant="static"
                                               onChange={handleInputChange}
                                               onKeyDown={handleKeyDown} />
                                    </CardBody>

                                    <div className="mb-6 mt-3 mx-6">
                                        <div className="flex justify-center items-center">
                                            <Button className="w-full" variant="gradient" color="green"
                                                    onClick={async () => {
                                                        const utcDate = moment(inputValueDateAndTime).utc().format();
                                                        await dispatch(setRecordDateAndTime(utcDate));
                                                        navigate(from, { state: { dateAndTime: utcDate } });
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

export default RecordDateAndTimePage;