import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import React from "react";
import { Progress } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export default function BudgetCard() {

    const budgets = [
        {
            id: 1,
            period: "weekly",
            name: "General",
            amount: 140.00,
            spent: 70.00,
        },
        {
            id: 2,
            period: "weekly",
            name: "Tobacco",
            amount: 50.00,
            spent: 55.00,
        },
        {
            id: 3,
            period: "monthly",
            name: "General",
            amount: 2000.00,
            spent: 1800.00,
        },
        {
            id: 4,
            period: "monthly",
            name: "Car",
            amount: 400.00,
            spent: 260.00,
        },
        {
            id: 5,
            period: "monthly",
            name: "House",
            amount: 500.00,
            spent: 250.00,
        }
    ]

    function generateAmountLeft(amount, spent) {
        return amount - spent;
    }

    function generatePercentageLeft(amount, spent) {
        let percentage = ((amount - spent) / amount * 100).toFixed(0);

        if (percentage < -999) percentage = `-999` + "+";

        return percentage;
    }

    function generateProgressColor(amount, spent) {
        if (spent / amount < 0.75) {
            return "green";
        } else if (spent / amount < 1) {
            return "orange";
        } else if (spent / amount >= 1) {
            return "red";
        }
    }

    function generateProgressValue(amount, spent) {
        let progressValue = spent / amount * 100;
        if (progressValue > 100) progressValue = 100;

        return progressValue;
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
                    Budgets
                    <Link to="/budgets" onClick={storeScrollPosition}>
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

                    {budgets
                        .filter(budget => budget.period === "weekly")
                        .map((budget) => (
                            <div key={budget.id}>
                                <Link to={`/budgets/weekly/${generatePath(budget.name)}`} onClick={storeScrollPosition}>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    {budget.name}
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        {generateAmountLeft(budget.amount, budget.spent).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                    <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                                        {generatePercentageLeft(budget.amount, budget.spent)}%
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={generateProgressValue(budget.amount, budget.spent)} size="lg" className="mt-2 mb-2" color={generateProgressColor(budget.amount, budget.spent)} />
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </div>
                        )
                    )}

                    {budgets.filter(budget => budget.period === "weekly").length === 0 && (
                        <Link to="/add_budget" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2 mt-6 p-0">
                                Add budget
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div>
                    <Typography variant="h6" className="text-gray-900 mb-2">
                        Monthly
                    </Typography>

                    {budgets
                        .filter(budget => budget.period === "monthly")
                        .map((budget) => (
                            <div key={budget.id}>
                                <Link to={`/budgets/monthly/${generatePath(budget.name)}`} onClick={storeScrollPosition}>
                                    <ListItem className="mb-2 flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-1 w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <Typography className="text-gray-900 font-medium mt-2 truncate">
                                                    {budget.name}
                                                </Typography>
                                                <div className="flex gap-4 items-center">
                                                    <Typography className="text-gray-900 font-semibold mt-2">
                                                        {generateAmountLeft(budget.amount, budget.spent).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                    <Typography className="text-gray-700 font-medium mt-2 text-sm">
                                                        {generatePercentageLeft(budget.amount, budget.spent)}%
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Progress value={generateProgressValue(budget.amount, budget.spent)} size="lg" className="mt-2 mb-2" color={generateProgressColor(budget.amount, budget.spent)} />
                                        </div>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800 mt-2 mb-2" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </div>
                        )
                    )}

                    {budgets.filter(budget => budget.period === "monthly").length === 0 && (
                        <Link to="/add_budget" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2 mt-6 p-0">
                                Add budget
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </div>

                <hr className="my-2 border-blue-gray-50 mb-6 mt-6" />

                <div className="container mx-auto mt-6">
                    <p className="text-xs flex items-center justify-center gap-4">
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-green-500"></span>
                            <span className="text-xxs">In limit</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-orange-500"></span>
                            <span className="text-xxs">Risk of overspent</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 inline-block mr-1 bg-red-500"></span>
                            <span className="text-xxs">Overspent</span>
                        </span>
                    </p>
                </div>

                <div className="h-6"></div>
            </CardBody>
        </Card>
    );
}