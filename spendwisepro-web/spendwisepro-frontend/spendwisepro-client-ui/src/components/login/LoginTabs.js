import React, {useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Checkbox,
} from "@material-tailwind/react";
import {ArrowDownTrayIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";

export default function LoginTabs() {

    const dataTabs = [
        {label: "Login", value: "login", icon: ArrowRightOnRectangleIcon},
        {label: "Register", value: "register", icon: ArrowDownTrayIcon}
    ];

    const [selectedTab, setSelectedTab] = useState("login");

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
                    <img src="https://i.ibb.co/RCG4xZ2/Spend-Wise-Pro-circle.png" alt="Logo" className="h-20 w-20" />
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
                        <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>

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
                                        {value === "login" ? (
                                            <>
                                                <div>
                                                    <Typography variant="h4" color="blue-gray">
                                                        Sign In
                                                    </Typography>
                                                    <Typography color="gray" className="mt-1 font-normal">
                                                        Enter your details to login.
                                                    </Typography>
                                                    <form className="mt-8 mb-2">
                                                        <div className="mb-4 flex flex-col gap-6">
                                                            <Input color="green" size="lg" label="Username or email" />
                                                            <Input color="green" type="password" size="lg" label="Password" />
                                                        </div>
                                                        <Checkbox
                                                            label={
                                                                <Typography
                                                                    variant="small"
                                                                    color="gray"
                                                                    className="flex items-center font-normal"
                                                                >
                                                                    Remember me
                                                                </Typography>
                                                            }
                                                            containerProps={{ className: "-ml-2.5" }}
                                                            color="green"
                                                        />
                                                        <Button color="green" className="mt-6" fullWidth>
                                                            Login
                                                        </Button>
                                                        <Typography color="gray" className="mt-4 text-center font-normal">
                                                            Did you forget the password?{" "}
                                                            <a href="#" className="font-medium text-gray-900">
                                                                Recover the account
                                                            </a>
                                                        </Typography>
                                                    </form>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <Typography variant="h4" color="blue-gray">
                                                        Sign Up
                                                    </Typography>
                                                    <Typography color="gray" className="mt-1 font-normal">
                                                        Enter your details to register.
                                                    </Typography>
                                                    <form className="mt-8 mb-2">
                                                        <div className="mb-4 flex flex-col gap-6">
                                                            <Input color="green" size="lg" label="Username" />
                                                            <Input color="green" size="lg" label="Email" />
                                                            <Input color="green" type="password" size="lg" label="Password" />
                                                            <Input color="green" type="password" size="lg" label="Confirm password" />
                                                        </div>
                                                        <Checkbox
                                                            label={
                                                                <Typography
                                                                    variant="small"
                                                                    color="gray"
                                                                    className="flex items-center font-normal"
                                                                >
                                                                    I agree the Terms and Conditions
                                                                </Typography>
                                                            }
                                                            containerProps={{ className: "-ml-2.5" }}
                                                            color="green"
                                                        />
                                                        <Button color="green" className="mt-6" fullWidth>
                                                            Register
                                                        </Button>
                                                    </form>
                                                </div>
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