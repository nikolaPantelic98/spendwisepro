import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import CashHeader from "../components/cash/CashHeader";
import PageWidthLayout from "../components/common/PageWidthLayout";
import CashChart from "../components/cash/CashChart";

function CashPage() {
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
                    <CashHeader/>
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div className="mx-6">
                            <CashChart/>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

                <div className="h-32 bg-green-50"></div>
            </div>

        </>
    );
}

export default CashPage;