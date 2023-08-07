import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageHeader from "../../components/common/PageHeader";
import AddRecordTabs from "../../components/record/AddRecordTabs";

function AddRecordPage() {
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
                    <PageHeader title="Add record" />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <AddRecordTabs/>
                </div>

            </div>

        </>
    );
}

export default AddRecordPage;