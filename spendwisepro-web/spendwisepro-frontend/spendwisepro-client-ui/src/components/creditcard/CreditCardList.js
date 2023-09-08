import {
    Card,
    CardBody,
    Typography,
    Button, ListItem,
} from "@material-tailwind/react";
import {ArrowLongRightIcon, ChevronRightIcon, CreditCardIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

export default function CreditCardList() {

    const creditCards = [
        {
            id: 1,
            type: "Visa",
            bank: "Banka Intesa",
            note: "Some Note1",
            icon: "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/visa-512.png"
        },
        {
            id: 2,
            type: "MasterCard",
            bank: "OTP Bank",
            note: "Some Note2",
            icon: "https://cdn3.iconfinder.com/data/icons/circle-payment-methods-4/512/Mastercard-512.png"
        },
        {
            id: 3,
            type: "American Express",
            bank: "U.S. Bank",
            note: "Some Note3",
            icon: "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/american-express-512.png"
        }
    ]

    const records = [
        {
            id: 1,
            amount: 30.00,
            type: "expense",
            date: new Date("2023-08-16T08:57"),
            note: "Window repair",
            paymentType: "Credit Card",
            creditCard: [
                { id: 1, type: "Visa", bank: "Banka Intesa", note: "Some Note1" }
            ],
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 2,
            amount: 25.00,
            type: "expense",
            date: new Date("2023-08-20T12:30"),
            note: "New door",
            paymentType: "Cash",
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 3,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-16T12:30"),
            note: "Garden maintenance",
            paymentType: "Credit Card",
            creditCard: [
                { id: 1, type: "Visa", bank: "Banka Intesa", note: "Some Note1" }
            ],
            category: [
                { id: 1, categoryName: "House and garden", icon: "https://i.ibb.co/P6tb18T/house.png" }
            ]
        },
        {
            id: 4,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-08-30T12:30"),
            note: "Tomato",
            paymentType: "Credit Card",
            creditCard: [
                { id: 1, type: "Visa", bank: "Banka Intesa", note: "Some Note1" }
            ],
            category: [
                { id: 2, categoryName: "Groceries", icon: "https://icon-library.com/images/grocery-icon-png/grocery-icon-png-14.jpg" }
            ]
        },
        {
            id: 5,
            amount: 100.00,
            type: "expense",
            date: new Date("2023-08-10T08:57"),
            note: "Car maintenance",
            paymentType: "Cash",
            category: [
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
            ]
        },
        {
            id: 6,
            amount: 112.00,
            type: "expense",
            date: new Date("2023-08-21T12:30"),
            note: "Broken window repair",
            paymentType: "Credit Card",
            creditCard: [
                { id: 2, type: "MasterCard", bank: "OTP Bank", note: "Some Note2" }
            ],
            category: [
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
            ]
        },
        {
            id: 7,
            amount: 45.00,
            type: "expense",
            date: new Date("2023-09-01T12:30"),
            note: "Fuel",
            paymentType: "Credit Card",
            creditCard: [
                { id: 2, type: "MasterCard", bank: "OTP Bank", note: "Some Note2" }
            ],
            category: [
                { id: 3, categoryName: "Car", icon: "https://i.ibb.co/p0Sc2Bs/car.png" }
            ]
        },
        {
            id: 8,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-21T08:57"),
            note: "Cigarette",
            paymentType: "Cash",
            category: [
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 9,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-18T12:30"),
            note: "Tobacco",
            paymentType: "Credit Card",
            creditCard: [
                { id: 2, type: "MasterCard", bank: "OTP Bank", note: "Some Note2" }
            ],
            category: [
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 10,
            amount: 22.00,
            type: "expense",
            date: new Date("2023-08-17T12:30"),
            note: "Pack",
            paymentType: "Credit Card",
            creditCard: [
                { id: 2, type: "MasterCard", bank: "OTP Bank", note: "Some Note2" }
            ],
            category: [
                { id: 4, categoryName: "Tobacco", icon: "https://www.iconbunny.com/icons/media/catalog/product/3/0/3050.12-cigarette-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 11,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-14T12:30"),
            time: "12:30",
            note: "Chips",
            paymentType: "Credit Card",
            creditCard: [
                { id: 2, type: "MasterCard", bank: "OTP Bank", note: "Some Note2" }
            ],
            category: [
                { id: 5, categoryName: "Snacks", icon: "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/5/2/524.9-fries-icon-iconbunny.jpg" }
            ]
        },
        {
            id: 12,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-08-22T08:57"),
            note: "Doctor",
            paymentType: "Cash",
            category: [
                { id: 6, categoryName: "Health care", icon: "https://i.ibb.co/k362Qsn/healthcare.png" }
            ]
        },
        {
            id: 13,
            amount: 15.00,
            type: "expense",
            date: new Date("2023-09-01T08:57"),
            note: "Card",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 14,
            amount: 27.00,
            type: "expense",
            date: new Date("2023-08-23T12:30"),
            note: "Cinema chips",
            paymentType: "Credit Card",
            creditCard: [
                { id: 1, type: "Visa", bank: "Banka Intesa", note: "Some Note1" }
            ],
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 15,
            amount: 600.00,
            type: "income",
            date: new Date("2023-08-01T12:30"),
            note: "Salary",
            paymentType: "Credit Card",
            creditCard: [
                { id: 1, type: "Visa", bank: "Banka Intesa", note: "Some Note1" }
            ],
            category: [
                { id: 7, categoryName: "Income", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 16,
            amount: 400.00,
            type: "income",
            date: new Date("2023-08-01T12:30"),
            note: "Salary",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Income", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 17,
            amount: 300.00,
            type: "income",
            date: new Date("2023-08-28T12:30"),
            note: "Invoice",
            paymentType: "Credit Card",
            creditCard: [
                { id: 2, type: "MasterCard", bank: "OTP Bank", note: "Some Note2" }
            ],
            category: [
                { id: 7, categoryName: "Income", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        },
        {
            id: 18,
            amount: 100.00,
            type: "expense",
            date: new Date("2023-09-06T08:57"),
            note: "Card",
            paymentType: "Cash",
            category: [
                { id: 7, categoryName: "Cinema", icon: "https://i.ibb.co/GC7MSvb/clapperboard.png" }
            ]
        }
    ];

    const recordsCreditCard = (() => {
        return records.filter(record => {
            return record.paymentType === "Credit Card";
        });
    })();

    const creditCardsWithAmount = creditCards.map(creditCard => {
        const matchingRecords = recordsCreditCard.filter(record => record.creditCard[0].id === creditCard.id);

        const amount = matchingRecords.reduce((totalAmount, record) => {
            if (record.type === "expense") {
                return totalAmount - record.amount;
            } else if (record.type === "income") {
                return totalAmount + record.amount;
            } else {
                return totalAmount;
            }
        }, 0);

        return { ...creditCard, amount };
    });

    function storeScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Your Credit Cards
                    {creditCards.length > 0 && (
                        <Link to="/add_credit_card" onClick={storeScrollPosition}>
                            <Button size="sm" variant="text" className="flex gap-2">
                                    Add
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}
                </Typography>

                <hr className="my-2 border-blue-gray-50" />

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">

                        {creditCardsWithAmount.map((creditCard) => (
                            <li key={creditCard.id} className="py-3 sm:py-4">
                                <Link>
                                    <ListItem className="flex items-center space-x-4 text-left p-0 focus:bg-green-50 hover:bg-green-50">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={creditCard.icon}  alt={creditCard.type} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                                {creditCard.type}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {creditCard.bank}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {creditCard.note}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                {creditCard.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <ChevronRightIcon className="h-5 w-5 text-green-800" />
                                        </div>
                                    </ListItem>
                                </Link>
                            </li>
                        ))}

                        {creditCards.length === 0 && (
                            <div>
                                <div className="flex justify-center items-center flex-col mb-6">
                                    <CreditCardIcon className="w-20 h-20 text-green-600 mb-2"/>
                                    <Typography variant="h6" className="text-gray-600">
                                        You currently have no
                                    </Typography>
                                    <Typography variant="h6" className="text-gray-600">
                                        credit cards added
                                    </Typography>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Link to="/add_credit_card" onClick={storeScrollPosition} className="w-full">
                                        <Button className="w-full" variant="gradient" color="green">
                                            <span>Add credit card</span>
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