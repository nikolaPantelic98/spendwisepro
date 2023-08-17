import {Button, Card, CardBody, ListItem, Progress, Typography,} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function GoalCard() {

    const goals = [
        {
            id: 1,
            period: "weekly",
            name: "Laptop",
            totalAmount: 1700.00,
            totalSaved: 600.00,
            amountSavedThisPeriod: 80.00,
            startDate: new Date("2023-06-05"),
            endDate: new Date("2023-10-02"),
            currentDate: new Date("2023-07-21")
        },
        {
            id: 2,
            period: "weekly",
            name: "Aqua Park",
            totalAmount: 260.00,
            totalSaved: 60.00,
            amountSavedThisPeriod: 20.00,
            startDate: new Date("2023-07-03"),
            endDate: new Date("2023-10-02"),
            currentDate: new Date("2023-07-21")
        },
        {
            id: 3,
            period: "monthly",
            name: "Vacation",
            totalAmount: 1200.00,
            totalSaved: 600.00,
            amountSavedThisPeriod: 100.00,
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-10-01"),
            currentDate: new Date("2023-07-21")
        },
        {
            id: 4,
            period: "monthly",
            name: "House",
            totalAmount: 3500.00,
            totalSaved: 2000.00,
            amountSavedThisPeriod: 150.00,
            startDate: new Date("2023-03-01"),
            endDate: new Date("2023-10-01"),
            currentDate: new Date("2023-07-21")
        }
    ]

    // calculates total intervals in weeks or months, based on the goal's period (weekly, monthly)
    function calculateIntervals(currentDate, endDate, period) {
        const dateCurrent = new Date(currentDate);
        const dateEnd = new Date(endDate);

        if (period === "weekly") {
            const timeDiff = dateEnd - dateCurrent;
            const weeks = Math.ceil(timeDiff / (7 * 24 * 60 * 60 * 1000));

            return Math.ceil(weeks);

        } else if (period === "monthly") {
            const timeDiff = dateEnd - dateCurrent;
            const months = Math.ceil(timeDiff / (30 * 24 * 60 * 60 * 1000));

            return Math.ceil(months);
        }
    }

    function calculateAmountToBeSaved(endDate, currentDate, period, totalAmount, totalSaved) {
        const remainingIntervals = calculateIntervals(currentDate, endDate, period);

        return ((totalAmount - totalSaved) / remainingIntervals).toFixed(2);
    }

    function calculateRemainingAmount(endDate, currentDate, period, totalAmount, totalSaved, amountSavedThisPeriod) {
        const amountToSave = calculateAmountToBeSaved(endDate, currentDate, period, totalAmount, totalSaved);

        const remainingAmount = amountToSave - amountSavedThisPeriod;

        return remainingAmount < 0 ? 0 : remainingAmount;
    }

    function calculateSavedPercentage(endDate, currentDate, period, totalAmount, totalSaved, amountSavedThisPeriod) {
        const amountToSave = calculateAmountToBeSaved(endDate, currentDate, period, totalAmount, totalSaved);
        const savedAmount = amountToSave - calculateRemainingAmount(endDate, currentDate, period, totalAmount, totalSaved, amountSavedThisPeriod);

        return ((savedAmount / amountToSave) * 100).toFixed(0);
    }

    function generateProgressColor(endDate, currentDate, period, totalAmount, totalSaved, amountSavedThisPeriod) {
        const savedPercentage = calculateSavedPercentage(endDate, currentDate, period, totalAmount, totalSaved, amountSavedThisPeriod);

        if (savedPercentage >= 100) {
            return "green";
        } else {
            return "orange";
        }
    }

    function generatePath(name) {
        return name.toLowerCase().replace(/\s+/g, '_');
    }

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Goals
                    <Link to="/goals" onClick={storeScrollPosition}>
                        <Button size="sm" variant="text" className="flex gap-2">
                                Show more
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </Link>
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900 mb-2">
                        Weekly
                    </Typography>

                    {goals
                        .filter(goal => goal.period === "weekly")
                        .map((goal) => (
                            <div key={goal.id}>
                                <Link to={`/goals/weekly/${generatePath(goal.name)}`} onClick={storeScrollPosition}>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    {goal.name}
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        {calculateRemainingAmount(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                    <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                                        {calculateSavedPercentage(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod)}%
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={calculateSavedPercentage(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod)} size="lg" className="mt-2 mb-2" color={generateProgressColor(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod)} />
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </div>
                        )
                    )}
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900 mb-2">
                        Monthly
                    </Typography>

                    {goals
                        .filter(goal => goal.period === "monthly")
                        .map((goal) => (
                            <div key={goal.id}>
                                <Link to={`/goals/monthly/${generatePath(goal.name)}`} onClick={storeScrollPosition}>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    {goal.name}
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        {calculateRemainingAmount(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                    <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                                        {calculateSavedPercentage(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod)}%
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={calculateSavedPercentage(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod)} size="lg" className="mt-2 mb-2" color={generateProgressColor(goal.endDate, goal.currentDate, goal.period, goal.totalAmount, goal.totalSaved, goal.amountSavedThisPeriod)} />
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </div>
                        )
                    )}
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <p className="text-xs flex items-center justify-center gap-4">
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-green-500"></span>
                            <span className="text-xxs">Completed</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-orange-500"></span>
                            <span className="text-xxs">In progress</span>
                        </span>
                    </p>
                </div>

                <div className="h-6"></div>
            </CardBody>
        </Card>
    );
}