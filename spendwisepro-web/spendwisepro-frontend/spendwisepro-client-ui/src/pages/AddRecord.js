import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import AddRecordHeader from "../components/record/AddRecordHeader";
import AddRecordForm from "../components/record/AddRecordForm";

function AddRecord() {
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
                        <div>
                            <AddRecordForm/>
                        </div>
                    </div>
                </div>

                <div className="h-32 bg-green-50"></div>
            </div>

        </>
    );
}

export default AddRecord;