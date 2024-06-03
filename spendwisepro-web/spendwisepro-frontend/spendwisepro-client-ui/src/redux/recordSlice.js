import { createSlice } from '@reduxjs/toolkit';

const recordSlice = createSlice({
    name: 'record',
    initialState: {
        transactionType: "",
        amount: 0,
        category: null,
        paymentType: "",
        creditCard: null,
        dateAndTime: null,
        note: "",
        selectedTab: "expense"
    },
    reducers: {
        setRecordTransactionType: (state, action) => {
            state.transactionType = action.payload;
        },
        setRecordAmount: (state, action) => {
            state.amount = action.payload;
        },
        setRecordCategory: (state, action) => {
            state.category = action.payload;
        },
        setRecordPaymentType: (state, action) => {
            state.paymentType = action.payload;
        },
        setRecordCreditCard: (state, action) => {
            state.creditCard = action.payload;
        },
        setRecordDateAndTime: (state, action) => {
            state.dateAndTime = action.payload;
        },
        setRecordNote: (state, action) => {
            state.note = action.payload;
        },
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload;
        },
        resetRecord: state => {
            state.transactionType = "";
            state.amount = 0;
            state.category = null;
            state.paymentType = "";
            state.creditCard = null;
            state.dateAndTime = null;
            state.note = "";
            state.selectedTab = "expense";
        },
    },
});

export const { setRecordTransactionType, setRecordAmount, setRecordCategory, setRecordPaymentType, setRecordCreditCard, setRecordDateAndTime, setRecordNote, setSelectedTab, resetRecord } = recordSlice.actions;

export default recordSlice.reducer;