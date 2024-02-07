import { configureStore } from '@reduxjs/toolkit';
import creditCardReducer from './creditCardSlice';
import categoryReducer from './categorySlice';
import budgetReducer from './budgetSlice';
import recordReducer from './recordSlice';

const store = configureStore({
    reducer: {
        creditCard: creditCardReducer,
        category: categoryReducer,
        budget: budgetReducer,
        record: recordReducer,
    },
});

export default store;