import {Card, CardBody, Progress, Typography} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {DocumentIcon} from "@heroicons/react/24/outline";
import axios from "axios";

export default function BudgetWeeklyTopExpenses({ id }) {

    const [weeklyBudgets, setWeeklyBudgets] = useState([]);
    const [recordsThisWeek, setRecordsThisWeek] = useState([]);
    const [categories, setCategories] = useState([]);
    const [budgetExpenses, setBudgetExpenses] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/budgets/weekly', { headers })
            .then(response => {
                setWeeklyBudgets(response.data);
            })
            .catch(error => console.error('Error fetching weekly budgets:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/records/expense_records_this_week', { headers })
            .then(response => {
                setRecordsThisWeek(response.data);
            })
            .catch(error => console.error('Error fetching expense records this week:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/spendwisepro/categories/all', { headers })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);


    // Create an array of top expenses within the weekly budget
    useEffect(() => {
        const calculateBudgetExpenses = () => {
            const foundBudget = weeklyBudgets.find(budget => budget.id == id);

            if (!foundBudget) {
                return null;
            }

            let matchingRecords = recordsThisWeek.filter(record => {
                let date = new Date(record.dateAndTime);
                return date && foundBudget.categories.some(budgetCategory => budgetCategory.name === record.category.name);
            });

            // Create a map to store categories and their accumulated amounts
            const categoryMap = new Map();

            // Iterate through matching records to calculate accumulated amounts
            matchingRecords.forEach(record => {
                if (typeof record.category === 'object') {
                    const categoryId = record.category.id;
                    const categoryName = record.category.name;
                    const amount = record.amount;

                    if (categoryMap[categoryId]) {
                        categoryMap[categoryId] = {
                            ...categoryMap[categoryId],
                            amount: categoryMap[categoryId].amount + amount
                        };
                    } else {
                        categoryMap[categoryId] = {
                            id: categoryId,
                            name: categoryName,
                            amount: amount,
                            color: record.category.color
                        };
                    }
                }
            });

            // Convert to an array of objects
            return Object.values(categoryMap);
        };

        const newBudgetExpenses = calculateBudgetExpenses();
        if (newBudgetExpenses) {
            newBudgetExpenses.sort((a, b) => b.amount - a.amount);
            setBudgetExpenses(newBudgetExpenses);
        }
    }, [weeklyBudgets, recordsThisWeek, id]);

    function generateProgressValue(amount) {
        const maxAmount = Math.max(...budgetExpenses.map(expense => expense.amount));
        return (amount / maxAmount) * 100;
    }

    return (
        <Card className="w-full shadow-lg mt-8">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4 flex items-center justify-between">
                    Top expenses
                </Typography>

                <hr className="my-2 border-blue-gray-50 mb-6" />

                <div>
                    {budgetExpenses.map(expense => (
                        <div className="mt-2" key={expense.id}>
                            <div className="flex items-center justify-between mb-2">
                                <Typography className="text-gray-900 font-medium mt-2">
                                    {expense.name}
                                </Typography>
                                <div className="flex gap-4 items-center">
                                    <Typography className="text-gray-900 font-semibold mt-2">
                                        ${expense.amount.toFixed(2)}
                                    </Typography>
                                </div>
                            </div>
                            <Progress value={generateProgressValue(expense.amount)} size="lg" className="mt-2" color={expense.color}/>
                        </div>
                    ))}
                </div>

                {budgetExpenses.length === 0 && (
                    <div className="flex justify-center items-center flex-col mb-3">
                        <DocumentIcon className="w-20 h-20 text-green-600 mb-2"/>
                        <Typography variant="h5" className="text-gray-600 mb-2">
                            No data to display
                        </Typography>
                        <Typography variant="h6" className="text-gray-500">
                            Please add some records
                        </Typography>
                    </div>
                )}

                <div className="h-4"></div>
            </CardBody>
        </Card>
    );
}