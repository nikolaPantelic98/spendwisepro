import {
    TabsHeader, Tab, TabsBody, TabPanel, Tabs,
} from "@material-tailwind/react";
import React, {useState} from "react";
import PageWidthLayout from "../common/PageWidthLayout";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import RecordListMonth from "./RecordListMonth";
import RecordListYear from "./RecordListYear";

export default function RecordListTabs() {

    const type = [
        {label: "Last month", value: "month", icon: CalendarDaysIcon},
        {label: "Last year", value: "year", icon: CalendarDaysIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("month");

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
                        {value === "month" ? (
                            // Content for "month" tab
                            <>
                                <div className="mt-2">
                                    <div className="mx-6">
                                        <RecordListMonth />
                                    </div>

                                    <div><PageWidthLayout/></div>
                                </div>
                            </>
                        ) : value === "year" ? (
                            // Content for "year" tab
                            <>
                                <div className="mt-2">

                                    <div className="mx-6">
                                        <RecordListYear />
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