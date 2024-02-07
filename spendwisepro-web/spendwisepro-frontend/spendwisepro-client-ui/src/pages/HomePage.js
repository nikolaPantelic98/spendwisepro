import React, {useEffect, useState} from 'react';
import Menu from '../components/common/Menu';
import LastRecordsCard from "../components/home/LastRecordsCard";
import BudgetCard from "../components/home/BudgetCard";
import GoalCard from "../components/home/GoalCard";
import TrendCard from "../components/home/TrendCard";
import PageWidthLayout from "../components/common/PageWidthLayout";
import PlannedPaymentsCard from "../components/home/PlannedPaymentsCard";
import TopExpensesCard from "../components/home/TopExpensesCard";

import { motion } from "framer-motion";

function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    useEffect(() => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem('scrollPosition');
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div>
                    <div className="h-6 bg-green-50"></div>

                        <div className="flex justify-center min-h-screen bg-green-50">
                            <motion.div initial={{x: 0}} animate={{x: 0}} exit={{x: -window.innerWidth, transition: {duration: 0.3}}} className="mt-2">

                                <div className="mx-6">
                                    <TrendCard/>
                                </div>

                                <div className="mt-8 mx-6">
                                    <LastRecordsCard/>
                                </div>

                                <div className="mt-8 mx-6">
                                    <TopExpensesCard/>
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
                            </motion.div>
                        </div>


                </div>
            </div>

        </>
    );
}

export default HomePage;