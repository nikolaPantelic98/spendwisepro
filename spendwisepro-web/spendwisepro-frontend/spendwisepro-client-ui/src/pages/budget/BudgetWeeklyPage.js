import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import BudgetWeeklyTabs from "../../components/budget/BudgetWeeklyTabs";
import PageHeader from "../../components/common/PageHeader";

function BudgetPage() {
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
                <BudgetWeeklyTabs/>
            </div>
        </div>
    );
}

export default BudgetPage;