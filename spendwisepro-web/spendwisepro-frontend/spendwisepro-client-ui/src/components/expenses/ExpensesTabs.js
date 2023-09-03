import {
    TabsHeader, Tab, TabsBody, TabPanel, Tabs,
} from "@material-tailwind/react";
import React, {useState} from "react";
import PageWidthLayout from "../common/PageWidthLayout";
import ExpensesOverviewMonth from "./ExpensesOverviewMonth";
import ExpensesListMonth from "./ExpensesListMonth";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import ExpensesOverviewWeek from "./ExpensesOverviewWeek";
import ExpensesListWeek from "./ExpensesListWeek";

export default function ExpensesTabs() {

    const type = [
        {label: "This week", value: "week", icon: CalendarDaysIcon},
        {label: "This Month", value: "month", icon: CalendarDaysIcon}
    ];

    const storedTab = sessionStorage.getItem('selectedTab');
    const [selectedTab, setSelectedTab] = useState(storedTab || "month");

    const handleTabChange = (value) => {
        setSelectedTab(value);
        sessionStorage.setItem('selectedTab', value);
    };

    React.useEffect(() => {
        if (storedTab) {
            setSelectedTab(storedTab);
        }
    }, [storedTab]);

    return (
        <Tabs className="mt-4" value={selectedTab} onChange={handleTabChange}>

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
                        {value === "week" ? (
                            // Content for "week" tab
                            <>
                                <div className="mt-2">

                                    <div className="mx-6">
                                        <ExpensesOverviewWeek/>
                                    </div>

                                    <div className="mx-6">
                                        <ExpensesListWeek/>
                                    </div>

                                    <div><PageWidthLayout/></div>
                                </div>
                            </>
                        ) : value === "month" ? (
                            // Content for "month" tab
                            <>
                                <div className="mt-2">

                                    <div className="mx-6">
                                        <ExpensesOverviewMonth/>
                                    </div>

                                    <div className="mx-6">
                                        <ExpensesListMonth/>
                                    </div>

                                    <div><PageWidthLayout/></div>
                                </div>
                            </>
                        ) : null}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}