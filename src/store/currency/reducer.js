import { CURRENCY_ACTIONS } from "./actions.js";

export const DEFAULT_CURRENCY = "GBP";

const reducer = (state = {}, action) => {
    switch(action.type) {
        case CURRENCY_ACTIONS.fetchCurrenciesSuccess: {
            const source = action.payload.source;
            const quotes = action.payload.quotes;

            return {
                ...state,
                source,
                quotes,
                target: source + DEFAULT_CURRENCY
            }
        }
        case CURRENCY_ACTIONS.fetchCurrenciesFail: {
            return {
                ...state,
                error: action.payload
            }
        }
        case CURRENCY_ACTIONS.changeCurrency: {
            return {
                ...state,
                target: action.payload
            }
        }
        default: 
            return state;
    }
}

export default reducer;