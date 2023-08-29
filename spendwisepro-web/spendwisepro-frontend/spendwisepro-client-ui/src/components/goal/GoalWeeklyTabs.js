import {
    TabsHeader, Tab, TabsBody, TabPanel, Tabs,
} from "@material-tailwind/react";
import React, {useState} from "react";
import PageWidthLayout from "../common/PageWidthLayout";
import {Bars3BottomLeftIcon, ChartBarIcon} from "@heroicons/react/24/outline";
import GoalWeeklyOverview from "./goal-weekly/GoalWeeklyOverview";
import GoalWeeklyChart from "./goal-weekly/GoalWeeklyChart";
import GoalWeeklyFullProcess from "./goal-weekly/GoalWeeklyFullProcess";
import GoalWeeklyLastPeriods from "./goal-weekly/GoalWeeklyLastPeriods";
import {useParams} from "react-router-dom";

export default function GoalWeeklyTabs() {

    const { '*': name } = useParams();

    const type = [
        {label: "Overview", value: "overview", icon: Bars3BottomLeftIcon},
        {label: "Full Process", value: "fullProcess", icon: ChartBarIcon}
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
                                        <GoalWeeklyOverview name={name}/>
                                    </div>

                                    <div className="mx-6">
                                        <GoalWeeklyChart name={name}/>
                                    </div>

                                    <div><PageWidthLayout/></div>
                                </div>
                            </>
                        ) : value === "fullProcess" ? (
                            // Content for "records" tab
                            <>
                                <div className="mt-2">

                                    <div className="mx-6">
                                        <GoalWeeklyFullProcess name={name} />
                                    </div>

                                    <div className="mx-6">
                                        <GoalWeeklyLastPeriods name={name}/>
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