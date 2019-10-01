import reducer, { DEFAULT_CURRENCY } from "./reducer";
import { CURRENCY_ACTIONS } from "./actions";

describe("Currency Reducer", () => {
	const initialState = {};

	it("should return the initial state", () => {
		const state = reducer(initialState, {});
        expect(state).toEqual(initialState);
	});

	it("should handle fetchCurrenciesSuccess", () => {
        const state = reducer(initialState, { 
            type: CURRENCY_ACTIONS.fetchCurrenciesSuccess, 
            payload: { 
                source: "USD", 
                quotes: { "USDGBP": 0.81, "USDEUR": 0.91 }
            } 
        });

		expect(state).toEqual({
			source: "USD",
			quotes: { "USDGBP": 0.81, "USDEUR": 0.91 },
			target: "USD" + DEFAULT_CURRENCY
		});
	});

	it("should handle fetchCurrenciesFail", () => {
		const state = reducer(initialState, { 
            type: CURRENCY_ACTIONS.fetchCurrenciesFail, 
            payload: new Error("This is an error.")
        });

		expect(state).toEqual({
            error: new Error("This is an error.")
		});
    });
    
    it("should handle changeCurrency", () => {
		const state = reducer(initialState, { 
            type: CURRENCY_ACTIONS.changeCurrency, 
            payload: "USDEUR"
        });

		expect(state).toEqual({
            target: "USDEUR"
		});
	});
});