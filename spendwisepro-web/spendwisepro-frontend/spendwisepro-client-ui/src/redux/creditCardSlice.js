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
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setIcon: (state, action) => {
            state.icon = action.payload;
        },
        setBank: (state, action) => {
            state.bank = action.payload;
        },
        setNote: (state, action) => {
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

export const { setAmount, setType, setIcon, setBank, setNote, resetCreditCard } = creditCardSlice.actions;

export default creditCardSlice.reducer;