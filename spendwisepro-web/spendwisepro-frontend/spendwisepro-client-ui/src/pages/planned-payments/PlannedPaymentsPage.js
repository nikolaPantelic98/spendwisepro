import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import PlannedPaymentsHeader from "../../components/planned-payments/PlannedPaymentsHeader";

function PlannedPaymentsPage() {
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
                    <PlannedPaymentsHeader />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div className="mx-6">
                            {/*content*/}
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default PlannedPaymentsPage;