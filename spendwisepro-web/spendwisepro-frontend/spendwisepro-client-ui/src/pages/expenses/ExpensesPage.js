import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import ExpensesHeader from "../../components/expenses/ExpensesHeader";
import ExpensesTabs from "../../components/expenses/ExpensesTabs";

function ExpensesPage() {
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
                    <ExpensesHeader/>
                </div>

                <div className=" flex justify-center min-h-screen bg-green-50">
                    <ExpensesTabs/>
                </div>

            </div>

        </>
    );
}

export default ExpensesPage;