import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import PageHeader from "../../components/common/PageHeader";
import ExpensesRecordsListWeekly from "../../components/expenses/week/ExpensesRecordsListWeekly";

function ExpensesRecordsWeeklyPage() {
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

                <div className="flex justify-center min-h-screen bg-green-50">
                    <div className="mt-2">
                        <div className="mx-6">
                            <ExpensesRecordsListWeekly />
                        </div>

                        <div><PageWidthLayout/></div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default ExpensesRecordsWeeklyPage;