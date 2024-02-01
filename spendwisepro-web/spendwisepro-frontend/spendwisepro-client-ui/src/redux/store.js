import { configureStore } from '@reduxjs/toolkit';
import creditCardReducer from './creditCardSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
    reducer: {
        creditCard: creditCardReducer,
        category: categoryReducer,
    },
});

export default store;