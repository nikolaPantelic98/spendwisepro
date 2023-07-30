import React, { useState } from 'react';
import Menu from '../../components/common/Menu';
import PageWidthLayout from "../../components/common/PageWidthLayout";
import BudgetWeeklyHeader from "../../components/budget/budget-weekly/BudgetWeeklyHeader";
import BudgetWeeklyOverview from "../../components/budget/budget-weekly/BudgetWeeklyOverview";
import BudgetWeeklyChart from "../../components/budget/budget-weekly/BudgetWeeklyChart";
import BudgetWeeklyLastPeriods from "../../components/budget/budget-weekly/BudgetWeeklyLastPeriods";
import BudgetWeeklyTopExpenses from "../../components/budget/budget-weekly/BudgetWeeklyTopExpenses";
import {ArrowTrendingUpIcon} from "@heroicons/react/24/solid";
import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import BudgetWeeklyRecords from "../../components/budget/budget-weekly/BudgetWeeklyRecords";
import {Bars3BottomLeftIcon, ClipboardDocumentIcon} from "@heroicons/react/24/outline";

function BudgetPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    const type = [
        {
            label: "Overview",
            value: "overview",
            icon: Bars3BottomLeftIcon
        },
        {
            label: "Records",
            value: "records",
            icon: ClipboardDocumentIcon
        },
    ];

    const [selectedTab, setSelectedTab] = useState("overview");

    return (
        <>
            <div className="overflow-hidden">
                <Menu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="h-6 bg-green-50"></div>

                <div>
                    <BudgetWeeklyHeader/>
                </div>

                <div className=" flex justify-center min-h-screen bg-green-50">

                    <Tabs className="mt-4" value={selectedTab} onChange={(value) => setSelectedTab(value)}>

                        <TabsHeader className="bg-green-100 ml-3 mr-3">
                            {type.map(({ label, value, icon }) => (
                                <Tab key={value} value={value}>
                                    <div className="flex items-center gap-2">
                                        {React.createElement(icon, { className: "w-5 h-5" })}
                                        {label}
                                    </div>
                                </Tab>
                            ))}
                        </TabsHeader>

                        <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
                            {type.map(({ value }) => (
                                <TabPanel key={value} value={value} className="p-0">
                                    {value === "overview" ? (
                                        // Content for "overview" tab
                                        <>
                                            <div className="mt-2">
                                                <div className="mx-6">
                                                    <BudgetWeeklyOverview/>
                                                </div>

                                                <div className="mx-6">
                                                    <BudgetWeeklyChart/>
                                                </div>

                                                <div className="mx-6">
                                                    <BudgetWeeklyLastPeriods/>
                                                </div>

                                                <div className="mx-6">
                                                    <BudgetWeeklyTopExpenses/>
                                                </div>

                                                <div><PageWidthLayout/></div>
                                            </div>
                                        </>
                                    ) : value === "records" ? (
                                        // Content for "records" tab
                                        <>
                                            <div className="mt-2">

                                                <div className="mx-6">
                                                    <BudgetWeeklyRecords />
                                                </div>

                                                <div><PageWidthLayout/></div>
                                            </div>
                                        </>
                                    ) : null}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default BudgetPage;