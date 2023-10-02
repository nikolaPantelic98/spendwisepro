import React, {useState} from 'react';
import {Card, CardBody, Typography, Tooltip} from "@material-tailwind/react";
import {
    BanknotesIcon, BellIcon, CalendarDaysIcon,
    ChartBarIcon,
    CircleStackIcon,
    LightBulbIcon
} from "@heroicons/react/24/outline";
import MenuLanding from "../components/landing-page/MenuLanding";
import {Link} from "react-router-dom";

function LandingPage() {

    const TooltipBalance = () => {
        return (
            <div className="p-1 flex justify-center items-center flex-col mb-3">
                <BanknotesIcon className="w-8 h-8 text-green-600 mb-2"/>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    View your current cash
                </Typography>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    and card balances
                </Typography>
            </div>
        );
    };

    const TooltipCategory = () => {
        return (
            <div className="p-1 flex justify-center items-center flex-col mb-3">
                <CircleStackIcon className="w-8 h-8 text-green-600 mb-2"/>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    Create, edit, and
                </Typography>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    categorize your expenses
                </Typography>
            </div>
        );
    };

    const TooltipGraph = () => {
        return (
            <div className="p-1 flex justify-center items-center flex-col mb-3">
                <ChartBarIcon className="w-8 h-8 text-green-600 mb-2"/>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    Monitor your expenses
                </Typography>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    through visual charts and trends
                </Typography>
            </div>
        );
    };

    const TooltipBudget = () => {
        return (
            <div className="p-1 flex justify-center items-center flex-col mb-3">
                <BellIcon className="w-8 h-8 text-green-600 mb-2"/>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    Set budget limits for different periods
                </Typography>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    and receive notifications when exceeded
                </Typography>
            </div>
        );
    };

    const TooltipGoal = () => {
        return (
            <div className="p-1 flex justify-center items-center flex-col mb-3">
                <LightBulbIcon className="w-8 h-8 text-green-600 mb-2"/>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    Define financial goals and
                </Typography>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    receive assistance in achieving them
                </Typography>
            </div>
        );
    };

    const TooltipPlan = () => {
        return (
            <div className="p-1 flex justify-center items-center flex-col mb-3">
                <CalendarDaysIcon className="w-8 h-8 text-green-600 mb-2"/>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    Plan and schedule upcoming
                </Typography>
                <Typography className="text-sm font-bold text-gray-600 mb-2 text-center">
                    payments to stay organized
                </Typography>
            </div>
        );
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => {
        setSidebarOpen(isOpen);
    };

    return (
        <>
            <div className="overflow-hidden">
                <MenuLanding sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex justify-center min-h-screen bg-green-50">

                    <div className="mx-6">
                        <div className="container mx-auto flex flex-col relative z-10">
                            <div className="flex flex-col items-start pt-14 pb-10 sm:py-0">
                                <h1 className="text-4xl xl:text-10xl text-green-900 font-bold leading-none">SpendWisePro</h1>
                                <h2 className="text-xl xl:text-3xl text-green-900 uppercase font-bold leading-none tracking-widest mt-4 mb-6">A step towards financial freedom</h2>
                                <p className="tracking-wider text-gray-700 ">SpendWisePro helps you manage your expenses, track your financial goals, and gain better control over your finances. Whether you want to monitor your spending, set budgets, or plan for future expenses, this app has you covered.</p>
                                <Link to="/login" className="text-white sm:font-xl uppercase py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg bg-green-900 hover:bg-green-800 mt-8 sm:mt-16">Get Started</Link>
                            </div>

                            <div className="flex gap-4">
                                <Card className="w-1/2 shadow-xl">
                                    <CardBody>
                                        <div>
                                            <Tooltip content={<TooltipBalance/>} size="sm" className="bg-gray-100 border-1 border-green-700"
                                                     animate={{
                                                         mount: { scale: 1, y: 0 },
                                                         unmount: { scale: 0, y: 25 },
                                                     }}>
                                                <div className="flex justify-center items-center flex-col">
                                                    <BanknotesIcon className="w-8 h-8 text-green-600 mb-2"/>
                                                    <Typography variant="h5" className="text-gray-600 mb-2">

                                                    </Typography>
                                                    <Typography variant="h6" className="text-gray-500 text-center">
                                                        View
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card className="w-1/2 shadow-xl">
                                    <CardBody>
                                        <div>
                                            <Tooltip content={<TooltipCategory/>}  size="sm" className="bg-gray-100 border-1 border-green-700"
                                                     animate={{
                                                         mount: { scale: 1, y: 0 },
                                                         unmount: { scale: 0, y: 25 },
                                                     }}>
                                                <div className="flex justify-center items-center flex-col">
                                                    <CircleStackIcon className="w-8 h-8 text-green-600 mb-2"/>
                                                    <Typography variant="h5" className="text-gray-600 mb-2">

                                                    </Typography>
                                                    <Typography variant="h6" className="text-gray-500 text-center">
                                                        Categorize
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="flex gap-4">
                                <Card className="w-1/2 shadow-xl mt-6">
                                    <CardBody>
                                        <div>
                                            <Tooltip content={<TooltipGraph/>}  size="sm" className="bg-gray-100 border-1 border-green-700"
                                                     animate={{
                                                         mount: { scale: 1, y: 0 },
                                                         unmount: { scale: 0, y: 25 },
                                                     }}>
                                                <div className="flex justify-center items-center flex-col">
                                                    <ChartBarIcon className="w-8 h-8 text-green-600 mb-2"/>
                                                    <Typography variant="h5" className="text-gray-600 mb-2">

                                                    </Typography>
                                                    <Typography variant="h6" className="text-gray-500 text-center">
                                                        Monitor
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card className="w-1/2 shadow-xl mt-6">
                                    <CardBody>
                                        <div>
                                            <Tooltip content={<TooltipBudget/>}  size="sm" className="bg-gray-100 border-1 border-green-700"
                                                     animate={{
                                                         mount: { scale: 1, y: 0 },
                                                         unmount: { scale: 0, y: 25 },
                                                     }}>
                                                <div className="flex justify-center items-center flex-col">
                                                    <BellIcon className="w-8 h-8 text-green-600 mb-2"/>
                                                    <Typography variant="h5" className="text-gray-600 mb-2">

                                                    </Typography>
                                                    <Typography variant="h6" className="text-gray-500 text-center">
                                                        Set limits
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="flex gap-4">
                                <Card className="w-1/2 shadow-xl mt-6">
                                    <CardBody>
                                        <div>
                                            <Tooltip content={<TooltipGoal/>}  size="sm" className="bg-gray-100 border-1 border-green-700"
                                                     animate={{
                                                         mount: { scale: 1, y: 0 },
                                                         unmount: { scale: 0, y: 25 },
                                                     }}>
                                                <div className="flex justify-center items-center flex-col">
                                                    <LightBulbIcon className="w-8 h-8 text-green-600 mb-2"/>
                                                    <Typography variant="h5" className="text-gray-600 mb-2">

                                                    </Typography>
                                                    <Typography variant="h6" className="text-gray-500 text-center">
                                                        Define goals
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card className="w-1/2 shadow-xl mt-6">
                                    <CardBody>
                                        <div>
                                            <Tooltip content={<TooltipPlan/>}  size="sm" className="bg-gray-100 border-1 border-green-700"
                                                     animate={{
                                                         mount: { scale: 1, y: 0 },
                                                         unmount: { scale: 0, y: 25 },
                                                     }}>
                                                <div className="flex justify-center items-center flex-col">
                                                    <CalendarDaysIcon className="w-8 h-8 text-green-600 mb-2"/>
                                                    <Typography variant="h5" className="text-gray-600 mb-2">

                                                    </Typography>
                                                    <Typography variant="h6" className="text-gray-500 text-center">
                                                        Schedule
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="h-32 bg-green-50">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;