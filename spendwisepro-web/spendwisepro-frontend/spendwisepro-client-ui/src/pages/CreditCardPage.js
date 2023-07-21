import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import PageWidthLayout from "../components/common/PageWidthLayout";
import CreditCardHeader from "../components/creditcard/CreditCardHeader";
import CreditCardChartCard from "../components/creditcard/CreditCardChartCard";

function CreditCardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <CreditCardHeader/>
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div className="mx-6">
                            <CreditCardChartCard/>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

                <div className="h-32 bg-green-50"></div>
            </div>

        </>
    );
}

export default CreditCardPage;