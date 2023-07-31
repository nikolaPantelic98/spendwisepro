import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import GoalWeeklyHeader from "../../components/goal/goal-weekly/GoalWeeklyHeader";
import GoalWeeklyOverview from "../../components/goal/goal-weekly/GoalWeeklyOverview";
import GoalWeeklyChart from "../../components/goal/goal-weekly/GoalWeeklyChart";

function GoalWeeklyPage() {
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
                    <GoalWeeklyHeader/>
                </div>

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div className="mx-6">
                            <GoalWeeklyOverview/>
                        </div>

                        <div className="mx-6">
                            <GoalWeeklyChart/>
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default GoalWeeklyPage;