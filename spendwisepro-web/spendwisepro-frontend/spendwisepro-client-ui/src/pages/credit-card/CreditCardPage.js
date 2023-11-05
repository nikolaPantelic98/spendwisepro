import React, {useEffect, useState} from 'react';
import Menu from '../../components/common/Menu';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import CreditCardChart from "../../components/creditcard/CreditCardChart";
import CreditCardList from "../../components/creditcard/CreditCardList";
import PageHeader from "../../components/common/PageHeader";
import {useLocation, useNavigate} from "react-router-dom";
import {Card, CardBody, Typography} from "@material-tailwind/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

function CreditCardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.success) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/credit_cards", {state: {success: false}, replace: true});
            }, 3000);
        }
    }, [location, navigate]);

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <PageHeader title="Credit card" />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">

                        {showSuccess ? (
                            <div className="mt-6 ml-6 mr-6">
                                <Card className="w-full h-1/3 shadow-lg mt-8">
                                    <CardBody>
                                        <div>
                                            <div className="flex justify-center items-center flex-col mb-3">
                                                <CheckCircleIcon className="w-8 h-8 text-green-600 mb-2"/>
                                                <Typography className="text-gray-600 text-sm font-semibold">
                                                    Credit card saved successfully
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        ) : null}

                        <div className="mx-6">
                            <CreditCardChart/>
                        </div>

                        <div className="mx-6">
                            <CreditCardList/>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default CreditCardPage;