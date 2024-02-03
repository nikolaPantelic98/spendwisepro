import { useDispatch } from 'react-redux';
import {resetCreditCard} from "./creditCardSlice";
import {resetCategory} from "./categorySlice";
import {resetBudget} from "./budgetSlice";

export function useReduxReset() {
    const dispatch = useDispatch();

    return () => {
        dispatch(resetCreditCard());
        dispatch(resetCategory());
        dispatch(resetBudget());
    };
}