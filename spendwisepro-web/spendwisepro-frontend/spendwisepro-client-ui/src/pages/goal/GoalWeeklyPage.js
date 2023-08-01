import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import BudgetWeeklyHeader from "../../components/budget/budget-weekly/BudgetWeeklyHeader";
import BudgetWeeklyTabs from "../../components/budget/BudgetWeeklyTabs";
import GoalWeeklyHeader from "../../components/goal/goal-weekly/GoalWeeklyHeader";
import GoalWeeklyTabs from "../../components/goal/GoalWeeklyTabs";

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
                <GoalWeeklyHeader />
            </div>

            <div className=" flex justify-center min-h-screen bg-green-50">
                <GoalWeeklyTabs />
            </div>
        </div>
    );
}

export default BudgetPage;