import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createMockStore } from "redux-test-utils";

import Checkout from "./Checkout";

import { PRODUCT_MOCK } from "../../store/testing/product.mock";
import { CURRENCY_ACTIONS } from "../../store/currency/actions";

const mockState = {
	currency: { source: "USD", quotes: { "USDGBP": 0.81, "USDEUR": 0.91 }, target: "GBP" },
	cart: { items: [PRODUCT_MOCK], size: 1 }
};

describe("Checkout", () => {
	let store;
	let container;

	beforeEach(() => {
		store = createMockStore(mockState);
		container = mount(
			<Provider store={store}>
				<Checkout />
			</Provider>
		);
	});

	it("renders the component", () => {
		expect(container).toBeTruthy();
    });

	it("renders the checked out items", () => {
        const items = container.find(".checkout-items");
        expect(items.length).toBe(1);
    });
    
    it("renders the exchange rates", () => {
        const rates = container.find("option");
        const ratesFromState = Object.keys(mockState.currency.quotes);
        rates.map((val, i) => expect(val.text()).toBe(ratesFromState[i].substring(3)));
    });

    it("changes the exchange rate from dropdown", () => {
        expect(container.find("select").props().value).toBe("GBP");
        container.find("select").simulate("change", { target: { value: "USDEUR" } });
        expect(store.isActionTypeDispatched(CURRENCY_ACTIONS.changeCurrency)).toBeTruthy();
    });

	afterEach(() => container.unmount());
});
