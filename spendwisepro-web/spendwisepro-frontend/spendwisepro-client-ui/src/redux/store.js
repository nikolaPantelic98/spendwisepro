import { configureStore } from '@reduxjs/toolkit';
import creditCardReducer from './creditCardSlice';

const store = configureStore({
    reducer: {
        creditCard: creditCardReducer,
    },
});

export default store;