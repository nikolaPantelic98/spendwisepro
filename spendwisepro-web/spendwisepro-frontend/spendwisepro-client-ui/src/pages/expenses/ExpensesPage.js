import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import ExpensesTabs from "../../components/expenses/ExpensesTabs";
import PageHeader from "../../components/common/PageHeader";

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
                    <PageHeader title="Expenses" />
                </div>

                <div className=" flex justify-center min-h-screen bg-green-50">
                    <ExpensesTabs/>
                </div>

            </div>

        </>
    );
}

export default ExpensesPage;