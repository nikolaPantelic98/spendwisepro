import {
    Card,
    CardBody,
    Typography,
    Button, Chip, ListItem,
} from "@material-tailwind/react";
import {
    ArrowLongRightIcon,
    ChevronRightIcon,
    ClockIcon
} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function PlannedPaymentsCard() {

    const plannedPayments = [
        {
            id: 1,
            name: "Electricity bills",
            categoryName: "Tax",
            paymentType: "Credit Card",
            amount: 85.00,
            paymentTime: 10,
            categoryIcon: "https://i.ibb.co/Y04MgVW/tax-icon-15117.png"
        },
        {
            id: 2,
            name: "Chips",
            categoryName: "Snacks",
            paymentType: "Cash",
            amount: 2.50,
            paymentTime: 1,
            categoryIcon: "https://cdn-icons-png.flaticon.com/512/1617/1617569.png"
        },
        {
            id: 3,
            name: "Phone bills",
            categoryName: "Phone",
            paymentType: "Credit Card",
            amount: 35.00,
            paymentTime: 6,
            categoryIcon: "https://cdn.icon-icons.com/icons2/70/PNG/512/phone_14179.png"
        }
    ]

    // sorting by payment time asc
    if (plannedPayments.length !== 0) {
        plannedPayments.sort((a, b) => a.paymentTime - b.paymentTime);
    }

    // shows only 3 planned payments
    const limitedPlannedPayments = plannedPayments.slice(0, 3);

    function generatePath(categoryName, name) {
        return categoryName.toLowerCase().replace(/\s+/g, '_') + "/" + name.toLowerCase().replace(/\s+/g, '_');
    }

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Planned Payments
                    {plannedPayments.length > 0 && (
                        <Link to="/planned_payments" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2">
                                View All
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </Typography>

                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        {limitedPlannedPayments.map((plannedPayment) => (
                            <li key={plannedPayment.id} className="py-3 sm:py-4">
                                <Link to={`/planned_payments/${plannedPayment.id}`}>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={plannedPayment.categoryIcon} alt={plannedPayment.name} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-green-600 truncate dark:text-white">
                                                {plannedPayment.name}
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {plannedPayment.categoryName}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {plannedPayment.paymentType}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                -{plannedPayment.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                in {plannedPayment.paymentTime} {plannedPayment.paymentTime === 1 ? 'day' : 'days'}
                                            </div>
                                            <div>
                                                <Chip variant="ghost" color="amber" value="Planned" className="mt-1 capitalize" />
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>
                        ))}

                        {plannedPayments.length === 0 && (
                            <div>
                                <div className="flex justify-center items-center flex-col mb-6">
                                    <ClockIcon className="w-20 h-20 text-green-600 mb-2"/>
                                    <Typography variant="h6" className="text-gray-600">
                                        You don't have upcoming
                                    </Typography>
                                    <Typography variant="h6" className="text-gray-600">
                                        planned payments
                                    </Typography>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Link to="/add_planned_payment" onClick={storeScrollPosition} className="w-full">
                                        <Button className="w-full" variant="gradient" color="green">
                                            <span>Add planned payment</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}