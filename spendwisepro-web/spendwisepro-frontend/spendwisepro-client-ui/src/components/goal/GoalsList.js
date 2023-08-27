import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

export default function GoalsList() {

    const goals = [
        {
            id: 1,
            period: "weekly",
            name: "Laptop",
            amount: 1700.00,
            startDate: new Date("2023-06-05"),
            endDate: new Date("2023-12-10")
        },
        {
            id: 2,
            period: "weekly",
            name: "Aqua Park",
            amount: 260.00,
            startDate: new Date("2023-07-03"),
            endDate: new Date("2023-09-10")
        },
        {
            id: 3,
            period: "monthly",
            name: "Vacation",
            amount: 1200.00,
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-12-29")
        },
        {
            id: 4,
            period: "monthly",
            name: "House",
            amount: 3500.00,
            startDate: new Date("2023-03-01"),
            endDate: new Date("2023-10-18")
        }
    ]

    const goalRecords = [
        {
            id: 1,
            amount: 10.00,
            date: new Date("2023-08-15"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 2,
            amount: 20.00,
            date: new Date("2023-08-19"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 3,
            amount: 5.00,
            date: new Date("2023-08-26"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 4,
            amount: 8.00,
            date: new Date("2023-08-26"),
            goal: [
                { id: 1, period: "weekly", name: "Laptop"}
            ]
        },
        {
            id: 5,
            amount: 15.00,
            date: new Date("2023-08-20"),
            goal: [
                { id: 2, period: "weekly", name: "Aqua Park"}
            ]
        },
        {
            id: 6,
            amount: 30.00,
            date: new Date("2023-08-22"),
            goal: [
                { id: 3, period: "monthly", name: "Vacation"}
            ]
        },
        {
            id: 7,
            amount: 55.00,
            date: new Date("2023-08-23"),
            goal: [
                { id: 3, period: "monthly", name: "Vacation"}
            ]
        },
        {
            id: 8,
            amount: 20.00,
            date: new Date("2023-08-25"),
            goal: [
                { id: 3, period: "monthly", name: "Vacation"}
            ]
        },
        {
            id: 9,
            amount: 100.00,
            date: new Date("2023-08-13"),
            goal: [
                { id: 4, period: "monthly", name: "House"}
            ]
        },
        {
            id: 10,
            amount: 250.00,
            date: new Date("2023-08-26"),
            goal: [
                { id: 4, period: "monthly", name: "House"}
            ]
        },
    ]

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Find the first day of the week (Monday) for the current date
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
    startOfWeek.setHours(0, 0, 0, 0);

    // Find the last day of the week (Sunday) for the current date
    const endOfWeek = new Date(currentDate);
    if (currentDate.getDay() !== 0) {
        endOfWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    }
    endOfWeek.setHours(23, 59, 59, 999);

    // Calculate the first day of the current month
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Calculate the last day of the current month
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const goalRecordsThisWeek = (() => {
        return goalRecords.filter(record => {
            return record.date >= startOfWeek && record.date <= endOfWeek && record.goal[0].period === "weekly";
        });
    })();

    const goalRecordsThisMonth = (() => {
        return goalRecords.filter(record => {
            return record.date >= startOfMonth && record.date <= endOfMonth && record.goal[0].period === "monthly";
        });
    })();

    const goalRecordsBeforeThisWeek = goalRecords.filter((record) => record.date < startOfWeek && record.goal[0].period === "weekly");
    const goalRecordsBeforeThisMonth = goalRecords.filter((record) => record.date < startOfMonth && record.goal[0].period === "monthly");

    const weeklyGoals = goals
        .filter((goal) => goal.period === "weekly")
        .map((goal) => {

            const matchingGoalRecordsBeforeThisWeek = goalRecordsBeforeThisWeek.filter((goalRecord) => goalRecord.goal.some((record) => record.id === goal.id));

            const matchingGoalRecordsCurrentWeek = goalRecordsThisWeek.filter((goalRecord) => goalRecord.goal.some((record) => record.id === goal.id));

            const totalSavedAmountBeforeThisWeek = matchingGoalRecordsBeforeThisWeek.reduce((sum, record) => sum + record.amount, 0);

            const remainingWeeksForGoal = (() => {
                const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                const goalEndTimeOfDay = moment.tz(goal.endDate, userTimezone).endOf('day');

                const startOfWeekStartOfDay = moment.tz(startOfWeek, userTimezone).startOf('day');

                const timeDifferenceInHours = goalEndTimeOfDay.diff(startOfWeekStartOfDay, 'hours');

                const hoursPerWeek = 24 * 7;

                return Math.ceil(timeDifferenceInHours / hoursPerWeek);
            })();

            const amountToBeSavedCurrentWeek = (goal.amount - totalSavedAmountBeforeThisWeek) / remainingWeeksForGoal;

            const savedAmountCurrentWeek = matchingGoalRecordsCurrentWeek.reduce((total, record) => total + record.amount, 0);

            const remainingAmountToBeSaved = amountToBeSavedCurrentWeek - savedAmountCurrentWeek;

            return {
                id: goal.id,
                name: goal.name,
                amount: amountToBeSavedCurrentWeek,
                savedAmount: savedAmountCurrentWeek,
                remainingAmountToBeSaved: remainingAmountToBeSaved
            };
        });

    const monthlyGoals = goals
        .filter((goal) => goal.period === "monthly")
        .map((goal) => {

            const matchingGoalRecordsBeforeThisMonth = goalRecordsBeforeThisMonth.filter((goalRecord) => goalRecord.goal.some((record) => record.id === goal.id));

            const matchingGoalRecordsCurrentMonth = goalRecordsThisMonth.filter((goalRecord) => goalRecord.goal.some((record) => record.id === goal.id));

            const totalSavedAmountBeforeThisMonth = matchingGoalRecordsBeforeThisMonth.reduce((sum, record) => sum + record.amount, 0);

            const remainingMonthsForGoal = (() => {
                const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                const goalEndTimeOfDay = moment.tz(goal.endDate, userTimezone).endOf('day');

                const startOfMonthStartOfDay = moment.tz(startOfMonth, userTimezone).startOf('day');

                const timeDifferenceInMonths = goalEndTimeOfDay.diff(startOfMonthStartOfDay, 'months') + 1;

                return Math.ceil(timeDifferenceInMonths);
            })();

            const amountToBeSavedCurrentMonth = (goal.amount - totalSavedAmountBeforeThisMonth) / remainingMonthsForGoal;

            const savedAmountCurrentMonth = matchingGoalRecordsCurrentMonth.reduce((total, record) => total + record.amount, 0);

            const remainingAmountToBeSaved = amountToBeSavedCurrentMonth - savedAmountCurrentMonth;

            return {
                id: goal.id,
                name: goal.name,
                amount: amountToBeSavedCurrentMonth,
                savedAmount: savedAmountCurrentMonth,
                remainingAmountToBeSaved: remainingAmountToBeSaved
            };
        });

    function calculateSavedPercentage(amountToBeSaved, savedAmount) {
        return ((savedAmount / amountToBeSaved) * 100).toFixed(0);
    }

    function generateProgressColor(amountToBeSaved, savedAmount) {
        const savedPercentage = calculateSavedPercentage(amountToBeSaved, savedAmount);

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
        <>
            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                        Weekly
                        <Link to="/add_goal" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2">
                                Add goal
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            {weeklyGoals
                                .map((goal) => (
                                    <li key={goal.id} className="py-3 sm:py-4">
                                        <Link to={`/goals/weekly/${generatePath(goal.name)}`} onClick={storeScrollPosition}>
                                            <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                <div className="flex-1 w-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                            {goal.name}
                                                        </Typography>
                                                        <div className="flex gap-4 items-center">
                                                            <Typography className="text-gray-900 font-semibold mt-2">
                                                                {goal.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <Progress value={calculateSavedPercentage(goal.amount, goal.savedAmount)} size="lg" className="mt-2 mb-2" color={generateProgressColor(goal.amount, goal.savedAmount)} />
                                                    <div className="flex justify-between">
                                                        <Typography className="text-sm font-semibold text-green-800">
                                                            {goal.savedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                        <Typography className="text-sm font-semibold text-gray-800">
                                                            {goal.remainingAmountToBeSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            Saved
                                                        </Typography>
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            To save
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                                </div>
                                            </ListItem>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </CardBody>
            </Card>

            <Card className="w-full shadow-lg mt-8">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                        Monthly
                        <Link to="/add_goal" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2">
                                Add goal
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    </Typography>
                    <hr className="my-2 border-blue-gray-50" />

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">

                            {monthlyGoals
                                .map((goal) => (
                                    <li key={goal.id} className="py-3 sm:py-4">
                                        <Link to={`/goals/monthly/${generatePath(goal.name)}`} onClick={storeScrollPosition}>
                                            <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                                <div className="flex-1 w-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                            {goal.name}
                                                        </Typography>
                                                        <div className="flex gap-4 items-center">
                                                            <Typography className="text-gray-900 font-semibold mt-2">
                                                                {goal.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <Progress value={calculateSavedPercentage(goal.amount, goal.savedAmount)} size="lg" className="mt-2 mb-2" color={generateProgressColor(goal.amount, goal.savedAmount)} />
                                                    <div className="flex justify-between">
                                                        <Typography className="text-sm font-semibold text-green-800">
                                                            {goal.savedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                        <Typography className="text-sm font-semibold text-gray-800">
                                                            {goal.remainingAmountToBeSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Typography>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            Saved
                                                        </Typography>
                                                        <Typography className="text-xs font-medium text-gray-600">
                                                            To save
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                                </div>
                                            </ListItem>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}