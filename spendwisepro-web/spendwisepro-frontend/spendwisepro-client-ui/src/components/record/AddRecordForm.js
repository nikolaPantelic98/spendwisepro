import {
    Button,
    Card,
    CardBody, Input, Option, Select, Tab, TabPanel, Tabs, TabsBody, TabsHeader,
} from "@material-tailwind/react";
import React, {useState} from "react";
import '../../App.css';
import {ArrowTrendingDownIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/solid";

export default function AddRecordForm() {

    const data = [
        {
            label: "Expense",
            value: "expense",
            icon: ArrowTrendingDownIcon
        },
        {
            label: "Income",
            value: "income",
            icon: ArrowTrendingUpIcon
        },
    ];

    const [selectedTab, setSelectedTab] = useState("expense");

    return (
        <Card className="mt-6">
            <CardBody>

                <div className="flow-root">
                    <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>

                        <TabsHeader>
                            {data.map(({ label, value, icon }) => (
                                <Tab key={value} value={value}>
                                    <div className="flex items-center gap-2">
                                        {React.createElement(icon, { className: "w-5 h-5" })}
                                        {label}
                                    </div>
                                </Tab>
                            ))}
                        </TabsHeader>

                        <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 }, }}>
                            {data.map(({ value }) => (
                                <TabPanel key={value} value={value}>
                                    {value === "expense" ? (
                                        <>
                                            <div className="m-6">
                                                <Input label="Amount" color="green" type="number" step="0.01" pattern="[0-9]*" />
                                            </div>
                                            <div className="m-6">
                                                <Select label="Category" menuProps={{ className: "h-48" }} color="green">
                                                    <Option value="Grocery">Grocery</Option>
                                                    <Option value="Fuel">Fuel</Option>
                                                    <Option value="Phone">Phone</Option>
                                                    <Option value="Snacks">Snacks</Option>
                                                    <Option value="Tax">Tax</Option>
                                                </Select>
                                            </div>
                                            <div className="m-6">
                                                <Select label="Payment Type"  color="green">
                                                    <Option value="Cash">Cash</Option>
                                                    <Option value="Cred Card">Credit Card</Option>
                                                </Select>
                                            </div>
                                            <div className="m-6">
                                                <Input label="Date and Time" color="green" type="date" />
                                            </div>
                                            <div className="m-6">
                                                <Input label="Note" color="green" />
                                            </div>

                                            <div className="m-6 mt-8">
                                                <Button size="md" color="red" className="bg-red-700 hover:bg-red-800">Add</Button>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <div className="m-6">
                                                <Input label="Amount" color="green" type="number" step="0.01" inputMode="decimal" pattern="[0-9]*" />
                                            </div>
                                            <div className="m-6">
                                                <Select label="Category" menuProps={{ className: "h-48" }} color="green">
                                                    <Option value="Grocery">Grocery</Option>
                                                    <Option value="Fuel">Fuel</Option>
                                                    <Option value="Phone">Phone</Option>
                                                    <Option value="Snacks">Snacks</Option>
                                                    <Option value="Tax">Tax</Option>
                                                </Select>
                                            </div>
                                            <div className="m-6">
                                                <Select label="Payment Type"  color="green">
                                                    <Option value="Cash">Cash</Option>
                                                    <Option value="Cred Card">Credit Card</Option>
                                                </Select>
                                            </div>
                                            <div className="m-6">
                                                <Input label="Date and Time" color="green" type="date" />
                                            </div>
                                            <div className="m-6">
                                                <Input label="Note" color="green" />
                                            </div>

                                            <div className="m-6 mt-8">
                                                <Button size="md" color="green" className="bg-green-700 hover:bg-green-800">Add</Button>
                                            </div>
                                        </>
                                    )}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>
            </CardBody>
        </Card>
    );
}