import { useDispatch } from 'react-redux';
import {resetCreditCard} from "./creditCardSlice";
import {resetCategory} from "./categorySlice";
import {resetBudget} from "./budgetSlice";
import {resetRecord} from "./recordSlice";

export function useReduxReset() {
    const dispatch = useDispatch();

    return () => {
        dispatch(resetCreditCard());
        dispatch(resetCategory());
        dispatch(resetBudget());
        dispatch(resetRecord());
    };
}