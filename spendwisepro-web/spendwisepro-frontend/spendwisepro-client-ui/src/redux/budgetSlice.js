import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        amount: "",
        name: "",
        period: "",
        categories: null
    },
    reducers: {
        setBudgetAmount: (state, action) => {
            state.amount = action.payload;
        },
        setBudgetName: (state, action) => {
            state.name = action.payload;
        },
        setBudgetPeriod: (state, action) => {
            state.period = action.payload;
        },
        setBudgetCategories: (state, action) => {
            state.categories = action.payload;
        },
        saveSelectedCategories: (state, action) => {
            state.selectedCategories = action.payload;
        },
        resetBudget: state => {
            state.amount = "";
            state.name = "";
            state.period = "";
            state.categories = null;
            // state.selectedCategories = null;
        },
    },
});

export const { setBudgetAmount, setBudgetName, setBudgetPeriod, setBudgetCategories, saveSelectedCategories, resetBudget } = budgetSlice.actions;

export default budgetSlice.reducer;