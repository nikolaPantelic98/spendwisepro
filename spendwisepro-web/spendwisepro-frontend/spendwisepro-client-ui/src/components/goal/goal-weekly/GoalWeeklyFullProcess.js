import {
    Card,
    CardBody,
    Typography,
    Chip, Button,
} from "@material-tailwind/react";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import moment from "moment-timezone";

export default function GoalWeeklyFullProcess( {name} ) {

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

    const goalRecordsThisWeek = (() => {
        return goalRecords.filter(record => {
            return record.date >= startOfWeek && record.date <= endOfWeek && record.goal[0].period === "weekly";
        });
    })();

    const goalRecordsBeforeThisWeek = goalRecords.filter((record) => record.date < startOfWeek && record.goal[0].period === "weekly");

    // find goal from the path
    const currentGoal = (() => {

        const foundGoal = goals.find(goal =>
            goal.period === "weekly" && goal.name.toLowerCase().replace(/\s+/g, '_') === name
        );

        const matchingGoalRecordsBeforeThisWeek = goalRecordsBeforeThisWeek.filter((goalRecord) => goalRecord.goal.some((record) => record.id === foundGoal.id));
        const matchingGoalRecordsCurrentWeek = goalRecordsThisWeek.filter((goalRecord) => goalRecord.goal.some((record) => record.id === foundGoal.id));

        const totalSavedAmountBeforeThisWeek = matchingGoalRecordsBeforeThisWeek.reduce((sum, record) => sum + record.amount, 0);
        const savedAmountCurrentWeek = matchingGoalRecordsCurrentWeek.reduce((total, record) => total + record.amount, 0);
        const totalSavedAmount = savedAmountCurrentWeek + totalSavedAmountBeforeThisWeek;
        const totalRemainingAmountToBeSaved = foundGoal.amount - totalSavedAmount;

        const weeksDuration = (() => {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const goalEndTime = moment.tz(foundGoal.endDate, userTimezone).endOf('day');
            const goalStartTime = moment.tz(foundGoal.startDate, userTimezone).startOf('day');
            const timeDifferenceInHours = goalEndTime.diff(goalStartTime, 'hours');
            const hoursPerWeek = 24 * 7;

            return Math.ceil(timeDifferenceInHours / hoursPerWeek);
        })();

        const currentWeek = (() => {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const currentTime = moment.tz(currentDate, userTimezone).endOf('day');
            const goalStartTime = moment.tz(foundGoal.startDate, userTimezone).startOf('day');
            const timeDifferenceInHours = currentTime.diff(goalStartTime, 'hours');
            const hoursPerWeek = 24 * 7;

            return Math.ceil(timeDifferenceInHours / hoursPerWeek);
        })();

        return {
            id: foundGoal.id,
            name: foundGoal.name,
            startDate: foundGoal.startDate,
            endDate: foundGoal.endDate,
            totalAmount: foundGoal.amount,
            totalSavedAmount: totalSavedAmount,
            totalRemainingAmountToBeSaved: totalRemainingAmountToBeSaved,
            weeksDuration: weeksDuration,
            currentWeek: currentWeek
        };
    })();

    function calculateSavedPercentage(amountToBeSaved, savedAmount) {
        return (savedAmount / amountToBeSaved) * 100;
    }

    function generateProgressColor(amountToBeSaved, savedAmount) {
        const savedPercentage = calculateSavedPercentage(amountToBeSaved, savedAmount);

        if (savedPercentage >= 100) {
            return "green";
        } else {
            return "orange";
        }
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Typography variant="h4" className="text-gray-900 font-bold mt-2 truncate">
                                        {currentGoal.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                    <Button size="sm" variant="text" className="mt-1">
                                        <PencilSquareIcon strokeWidth={2} className="w-6 h-6" />
                                    </Button>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Chip size="md" value={`${calculateSavedPercentage(currentGoal.totalAmount, currentGoal.totalSavedAmount).toFixed(0)}%`} variant="ghost" className="bg-gray-200 text-gray-900 font-semibold mt-2 text-sm" />
                                </div>
                            </div>
                            <Progress value={calculateSavedPercentage(currentGoal.totalAmount, currentGoal.totalSavedAmount)} size="lg" className="mt-2 mb-2" color={generateProgressColor(currentGoal.totalAmount, currentGoal.totalSavedAmount)} />
                            <div className="flex justify-between">
                                <Typography className="font-semibold text-green-800">
                                    {currentGoal.totalSavedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                                <Typography className="font-semibold text-gray-800">
                                    {currentGoal.totalRemainingAmountToBeSaved.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                            </div>
                            <div className="flex justify-between mb-6">
                                <Typography className="text-sm font-medium text-gray-600">Saved</Typography>
                                <Typography className="text-sm font-medium text-gray-600">To save</Typography>
                            </div>

                            <div className="flex justify-between">
                                <Typography className="text-sm font-medium text-gray-600">Date started</Typography>
                                <Typography className="text-sm font-medium text-gray-600">Date end</Typography>
                            </div>
                            <div className="flex justify-between mb-6">
                                <Typography className="font-semibold text-gray-800">
                                    {moment(currentGoal.startDate).format("DD.MM.YYYY.")}
                                </Typography>
                                <Typography className="font-semibold text-gray-800">
                                    {moment(currentGoal.endDate).format("DD.MM.YYYY.")}
                                </Typography>
                            </div>

                            <div className="flex justify-center">
                                <Typography className="text-sm font-medium text-gray-600">Today</Typography>
                            </div>
                            <div className="flex justify-center">
                                <Typography className="font-semibold text-teal-600">
                                    {moment(currentDate).format("DD.MM.YYYY.")}
                                </Typography>
                            </div>
                            <div className="flex justify-center mb-6">
                                <Typography className="font-semibold text-gray-800">{`Week ${currentGoal.currentWeek}`}</Typography>
                            </div>

                            <div className="flex justify-center">
                                <Typography className="text-sm font-medium text-gray-600">Time of progress</Typography>
                            </div>
                            <div className="flex justify-center">
                                <Typography className="font-semibold text-gray-800">{`${currentGoal.weeksDuration} weeks`}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}