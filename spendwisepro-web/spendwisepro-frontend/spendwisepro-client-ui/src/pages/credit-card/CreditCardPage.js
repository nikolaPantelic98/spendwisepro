import React, {useEffect, useState} from 'react';
import Menu from '../../components/common/Menu';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import CreditCardChart from "../../components/creditcard/CreditCardChart";
import CreditCardList from "../../components/creditcard/CreditCardList";
import PageHeader from "../../components/common/PageHeader";
import {useLocation, useNavigate} from "react-router-dom";
import SuccessCard from "../../components/common/SuccessCard";

function CreditCardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.addSuccess) {
            setShowAddSuccess(true);
            setTimeout(() => {
                setShowAddSuccess(false);
                navigate("/credit_cards", {state: {addSuccess: false}, replace: true});
            }, 3000);
        } else if (location.state && location.state.updateSuccess) {
            setShowUpdateSuccess(true);
            setTimeout(() => {
                setShowUpdateSuccess(false);
                navigate("/credit_cards", {state: {updateSuccess: false}, replace: true});
            }, 3000);
        } else if (location.state && location.state.deleteSuccess) {
            setShowDeleteSuccess(true);
            setTimeout(() => {
                setShowDeleteSuccess(false);
                navigate("/credit_cards", {state: {deleteSuccess: false}, replace: true});
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

                        {showAddSuccess ? (
                            <SuccessCard text="Credit card added successfully" />
                        ) : null}

                        {showUpdateSuccess ? (
                            <SuccessCard text="Credit card updated successfully" />
                        ) : null}

                        {showDeleteSuccess ? (
                            <SuccessCard text="Credit card deleted successfully" />
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