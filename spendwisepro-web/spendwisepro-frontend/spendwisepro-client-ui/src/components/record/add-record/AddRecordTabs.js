import {
    TabsHeader, Tab, TabsBody, TabPanel, Tabs
} from "@material-tailwind/react";
import React, {useState} from "react";
import PageWidthLayout from "../../common/PageWidthLayout";
import {ArrowTrendingDownIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/solid";
import AddRecordExpense from "./AddRecordExpense";
import AddRecordIncome from "./AddRecordIncome";

export const RecordContext = React.createContext();

export default function AddRecordTabs() {

    const type = [
        {label: "Expense", value: "expense", icon: ArrowTrendingDownIcon},
        {label: "Income", value: "income", icon: ArrowTrendingUpIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("expense");

    const [record, setRecord] = useState({
        amount: "",
        category: null,
        paymentType: "",
        creditCard: null,
        dateAndTime: null,
        note: ""
    });

    return (
        <RecordContext.Provider value={{ record, setRecord }}>
            <div className="relative">

                <Tabs className="mt-8" value={selectedTab} onChange={(value) => setSelectedTab(value)}>

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
                                {value === "expense" ? (
                                    // Content for "expense" tab
                                    <>
                                        <div className="mt-2">
                                            <div className="mx-6">
                                                <AddRecordExpense/>
                                            </div>

                                            <div><PageWidthLayout/></div>
                                        </div>
                                    </>
                                ) : value === "income" ? (
                                    // Content for "income" tab
                                    <>
                                        <div className="mt-2">

                                            <div className="mx-6">
                                                <AddRecordIncome />
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
        </RecordContext.Provider>
    );
}