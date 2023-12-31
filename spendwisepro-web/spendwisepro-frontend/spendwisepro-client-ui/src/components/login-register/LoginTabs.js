import React, {useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,

} from "@material-tailwind/react";
import {ArrowDownTrayIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginTabs() {

    const dataTabs = [
        {label: "Login", value: "login-register", icon: ArrowRightOnRectangleIcon},
        {label: "Register", value: "register", icon: ArrowDownTrayIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("login-register");

    return (
        <Card className="w-full shadow-lg">
            <CardHeader
                color="gray"
                floated={false}
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url("https://static.vecteezy.com/system/resources/previews/001/988/451/original/seamless-money-background-vector.jpg")',
                    backgroundBlendMode: 'multiply'
                }}
                className="m-0 grid place-items-center rounded-b-none py-8 px-4 bg-contain bg-center  text-center"
            >
                <div className="mt-4 mb-4 rounded-full border border-white/10 bg-white/10 p-3 text-white">
                    <img src="https://i.ibb.co/3Mzndmy/Spend-Wise-Pro-full.png" alt="Logo" className="h-20 w-20" />
                </div>
                <Typography variant="h4" color="white">
                    SpendWisePro
                </Typography>
                <Typography variant="h6" color="white">
                    - A step towards financial freedom -
                </Typography>
            </CardHeader>

            <CardBody>


                <div className="flow-root">
                    <div className="flow-root">
                        <Tabs value={`login-register`} onChange={(value) => setSelectedTab(value)}>

                            <TabsHeader>
                                {dataTabs.map(({ label, value, icon }) => (
                                    <Tab key={value} value={value}>
                                        <div className="flex items-center gap-2">
                                            {React.createElement(icon, { className: "w-5 h-5" })}
                                            {label}
                                        </div>
                                    </Tab>
                                ))}
                            </TabsHeader>

                            <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 }, }}>
                                {dataTabs.map(({ value }) => (
                                    <TabPanel key={value} value={value}>
                                        {value === "login-register" ? (
                                            <>
                                                <LoginForm />
                                            </>
                                        ) : (
                                            <>
                                                <RegisterForm />
                                            </>
                                        )}
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>

            </CardBody>
        </Card>
    );
}