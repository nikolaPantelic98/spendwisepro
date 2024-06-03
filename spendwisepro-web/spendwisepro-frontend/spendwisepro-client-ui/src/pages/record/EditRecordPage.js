import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageHeader from "../../components/common/PageHeader";
import EditRecordForm from "../../components/record/edit-record/EditRecordForm";
import PageWidthLayout from "../../components/common/PageWidthLayout";

import { motion } from "framer-motion";

function EditRecordPage() {
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
                    <PageHeader title="Edit record" />
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <motion.div initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.3}}} className="mt-2">
                        <div className="mx-6">
                            <EditRecordForm />
                    </div>

                        <div><PageWidthLayout/></div>
                    </motion.div>
                </div>

            </div>

        </>
    );
}

export default EditRecordPage;