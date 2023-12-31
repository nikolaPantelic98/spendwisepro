import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageHeader from "../../components/common/PageHeader";
import {useParams} from "react-router-dom";
import GoalMonthlyTabs from "../../components/goal/GoalMonthlyTabs";

function GoalMonthlyPage() {
    const { '*': name } = useParams();

    // formatting the name of the goal from the path
    const formatName = (name) => {
        const words = name.split('_');
        const formattedWords = words.map((word, index) => {
            if (index === 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            } else {
                return word.toLowerCase();
            }
        });
        return formattedWords.join(' ');
    };

    const formattedName = formatName(name);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };



    return (
        <div className="overflow-hidden">
            <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="h-6 bg-green-50"></div>

            <div>
                <PageHeader title={formattedName} />
            </div>

            <div className=" flex justify-center min-h-screen bg-green-50">
                <GoalMonthlyTabs />
            </div>
        </div>
    );
}

export default GoalMonthlyPage;