import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import BalanceCard from '../components/home/BalanceCard';
import CashCard from '../components/home/CashCard';
import CreditCardCard from '../components/home/CreditCardCard';
import LastRecordsCard from "../components/home/LastRecordsCard";
import BudgetCard from "../components/home/BudgetCard";
import GoalCard from "../components/home/GoalCard";

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
                        <BalanceCard/>
                    </div>

                    <div className="flex gap-4 mt-8 mx-6">
                        <div className="w-1/2">
                            <CashCard />
                        </div>
                        <div className="w-1/2">
                            <CreditCardCard />
                        </div>
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
                </div>
            </div>

            <div className="h-32 bg-green-50"></div>
        </>
    );
}

export default HomePage;