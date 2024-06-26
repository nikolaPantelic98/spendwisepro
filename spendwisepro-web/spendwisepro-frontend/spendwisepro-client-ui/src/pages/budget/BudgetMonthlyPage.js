import React, {useEffect, useState} from 'react';
import Menu from '../../components/common/Menu';
import PageHeader from "../../components/common/PageHeader";
import BudgetMonthlyTabs from "../../components/budget/BudgetMonthlyTabs";
import {useParams} from "react-router-dom";
import axios from "axios";
import getData from "../../api/axiosInstance";

function BudgetMonthlyPage() {
    const { '*': id } = useParams();
    const [budget, setBudget] = useState(null);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        getData(
            `/budgets/${id}`,
            headers,
            setBudget,
            `Error fetching budget with id ${id}`
        )
    }, [id]);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };



    return (
        <div className="overflow-hidden">
            <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="h-6 bg-green-50"></div>

            <div>
                <PageHeader title={budget ? budget.name : 'Loading...'} />
            </div>

            <div className=" flex justify-center min-h-screen bg-green-50">
                <BudgetMonthlyTabs/>
            </div>
        </div>
    );
}

export default BudgetMonthlyPage;