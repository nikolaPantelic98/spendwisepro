import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import AddRecordHeader from "../../components/record/AddRecordHeader";
import AddRecordForm from "../../components/record/AddRecordForm";
import PageWidthLayout from "../../components/common/PageWidthLayout";

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
                    <AddRecordHeader/>
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div className="mx-6">
                            <AddRecordForm/>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default AddRecordPage;