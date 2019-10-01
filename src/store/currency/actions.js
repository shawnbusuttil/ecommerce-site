const BASE_URL = "http://www.apilayer.net/api/live";
const API_KEY = "cf4ff0a7d2a86f8df4e6b0b64e40fdcd";
const CURRENCIES = ["GBP", "USD", "EUR", "AUD", "CAD"];

const CURRENCIES_URL = `${BASE_URL}?access_key=${API_KEY}&currencies=${CURRENCIES.join(",")}`;

export const CURRENCY_ACTIONS = {
    fetchCurrencies: "[Currency] Fetch Currencies",
    fetchCurrenciesSuccess: "[Currency] Fetch Currencies Success",
    fetchCurrenciesFail: "[Currency] Fetch Currencies Fail",

    changeCurrency: "[Currency] Change Currency"
}

export const currencyActions = {
    fetchCurrencies() {
        return {
            type: CURRENCY_ACTIONS.fetchCurrencies
        }
    },
    fetchCurrenciesSuccess(payload) {
        return {
            type: CURRENCY_ACTIONS.fetchCurrenciesSuccess,
            payload
        }
    },
    fetchCurrenciesFail(payload) {
        return {
            type: CURRENCY_ACTIONS.fetchCurrenciesFail,
            payload
        }
    },
    changeCurrency(payload) {
        return {
            type: CURRENCY_ACTIONS.changeCurrency,
            payload
        }
    }
}

export function fetchCurrencies() {
    return (dispatch) => {
        dispatch(currencyActions.fetchCurrencies());
        return fetch(CURRENCIES_URL).then(res => res.json())
            .then(json => {
                dispatch(currencyActions.fetchCurrenciesSuccess({ source: json.source, quotes: json.quotes }));
            })
            .catch(error => dispatch(currencyActions.fetchCurrenciesFail(error)))
    }
}