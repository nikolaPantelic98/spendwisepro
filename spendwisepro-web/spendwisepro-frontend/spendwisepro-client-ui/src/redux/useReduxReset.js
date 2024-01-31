import { useDispatch } from 'react-redux';
import {resetCreditCard} from "./creditCardSlice";

export function useReduxReset() {
    const dispatch = useDispatch();

    return () => {
        dispatch(resetCreditCard());
    };
}