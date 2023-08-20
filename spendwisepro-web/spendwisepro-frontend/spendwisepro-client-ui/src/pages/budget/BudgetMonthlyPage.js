import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageHeader from "../../components/common/PageHeader";
import BudgetMonthlyTabs from "../../components/budget/BudgetMonthlyTabs";

function BudgetMonthlyPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };



    return (
        <div className="overflow-hidden">
            <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="h-6 bg-green-50"></div>

            <div>
                <PageHeader title="General" />
            </div>

            <div className=" flex justify-center min-h-screen bg-green-50">
                <BudgetMonthlyTabs/>
            </div>
        </div>
    );
}

export default BudgetMonthlyPage;