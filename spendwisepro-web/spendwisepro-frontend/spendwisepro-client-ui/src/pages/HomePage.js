import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import LastRecordsCard from "../components/home/LastRecordsCard";
import BudgetCard from "../components/home/BudgetCard";
import GoalCard from "../components/home/GoalCard";
import TrendCard from "../components/home/TrendCard";
import PageWidthLayout from "../components/common/PageWidthLayout";
import PlannedPaymentsCard from "../components/home/PlannedPaymentsCard";

function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    return (
        <>
            <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="h-6 bg-green-50"></div>

            <div className="flex justify-center min-h-screen bg-green-50">
                <div className="mt-2">

                    <div className="mx-6">
                        <TrendCard/>
                    </div>

                    <div className="mt-8 mx-6">
                        <LastRecordsCard/>
                    </div>

                    <div className="mt-8 mx-6">
                        <BudgetCard/>
                    </div>

                    <div className="mt-8 mx-6">
                        <GoalCard/>
                    </div>

                    <div className="mt-8 mx-6">
                        <PlannedPaymentsCard/>
                    </div>

                    <div><PageWidthLayout/></div>
                </div>
            </div>

        </>
    );
}

export default HomePage;