import { configureStore } from '@reduxjs/toolkit';
import creditCardReducer from './creditCardSlice';
import categoryReducer from './categorySlice';
import budgetReducer from './categorySlice';

const store = configureStore({
    reducer: {
        creditCard: creditCardReducer,
        category: categoryReducer,
        budget: budgetReducer,
    },
});

export default store;