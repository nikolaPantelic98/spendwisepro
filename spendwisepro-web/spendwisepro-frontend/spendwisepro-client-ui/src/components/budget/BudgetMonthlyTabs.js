import {
    TabsHeader, Tab, TabsBody, TabPanel, Tabs,
} from "@material-tailwind/react";
import React, {useState} from "react";
import PageWidthLayout from "../common/PageWidthLayout";
import {Bars3BottomLeftIcon, ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import {useParams} from "react-router-dom";
import BudgetMonthlyOverview from "./budget-monthly/BudgetMonthlyOverview";

export default function BudgetMonthlyTabs() {

    const { '*': name } = useParams();

    const type = [
        {label: "Overview", value: "overview", icon: Bars3BottomLeftIcon},
        {label: "Records", value: "records", icon: ClipboardDocumentIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("overview");

    return (
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
                                        <BudgetMonthlyOverview name={name} />
                                    </div>

                                    <div className="mx-6">
                                        {/*<BudgetMonthlyChart/>*/}
                                    </div>

                                    <div className="mx-6">
                                        {/*<BudgetMonthlyLastPeriods/>*/}
                                    </div>

                                    <div className="mx-6">
                                        {/*<BudgeMonthlyTopExpenses/>*/}
                                    </div>

                                    <div><PageWidthLayout/></div>
                                </div>
                            </>
                        ) : value === "records" ? (
                            // Content for "records" tab
                            <>
                                <div className="mt-2">

                                    <div className="mx-6">
                                        {/*<BudgetMonthlyRecords />*/}
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