import { createSlice } from '@reduxjs/toolkit';

const creditCardSlice = createSlice({
    name: 'creditCard',
    initialState: {
        amount: 0,
        type: "",
        icon: null,
        bank: "",
        note: ""
    },
    reducers: {
        setCreditCardAmount: (state, action) => {
            state.amount = action.payload;
        },
        setCreditCardType: (state, action) => {
            state.type = action.payload;
        },
        setCreditCardIcon: (state, action) => {
            state.icon = action.payload;
        },
        setCreditCardBank: (state, action) => {
            state.bank = action.payload;
        },
        setCreditCardNote: (state, action) => {
            state.note = action.payload;
        },
        resetCreditCard: state => {
            state.amount = 0;
            state.type = "";
            state.icon = null;
            state.bank = "";
            state.note = "";
        },
    },
});

export const { setCreditCardAmount, setCreditCardType, setCreditCardIcon, setCreditCardBank, setCreditCardNote, resetCreditCard } = creditCardSlice.actions;

export default creditCardSlice.reducer;