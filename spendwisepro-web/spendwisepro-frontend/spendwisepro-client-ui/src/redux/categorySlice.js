import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        name: "",
        color: "",
        icon: null,
        parent: null
    },
    reducers: {
        setCategoryName: (state, action) => {
            state.name = action.payload;
        },
        setCategoryColor: (state, action) => {
            state.color = action.payload;
        },
        setCategoryIcon: (state, action) => {
            state.icon = action.payload;
        },
        setCategoryParent: (state, action) => {
            state.parent = action.payload;
        },
        resetCategory: state => {
            state.name = "";
            state.color = "";
            state.icon = null;
            state.parent = null;
        },
    },
});

export const { setCategoryName, setCategoryColor, setCategoryIcon, setCategoryParent, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;