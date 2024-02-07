import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageHeader from "../../components/common/PageHeader";
import AddRecordTabs from "../../components/record/add-record/AddRecordTabs";

import { motion } from "framer-motion";

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
                    <motion.div initial={{x: 0}} animate={{x: 0}} exit={{x: -window.innerWidth, transition: {duration: 0.3}}}>
                        <AddRecordTabs />
                    </motion.div>
                </div>

            </div>

        </>
    );
}

export default AddRecordPage;