import React, { useState } from 'react';
import Menu from '../components/common/Menu';
import Balance from '../components/home/Balance';
import Cash from '../components/home/Cash';
import CreditCard from '../components/home/CreditCard';
import LastRecords from "../components/home/LastRecords";
import Budget from "../components/home/Budget";
import Goal from "../components/home/Goal";

function Home() {
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
                        <Balance/>
                    </div>

                    <div className="flex gap-4 mt-8 mx-6">
                        <div className="w-1/2">
                            <Cash />
                        </div>
                        <div className="w-1/2">
                            <CreditCard />
                        </div>
                    </div>

                    <div className="mt-8 mx-6">
                        <LastRecords/>
                    </div>

                    <div className="mt-8 mx-6">
                        <Budget/>
                    </div>

                    <div className="mt-8 mx-6">
                        <Goal/>
                    </div>
                </div>
            </div>

            <div className="h-32 bg-green-50"></div>
        </>
    );
}

export default Home;