import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { createMockStore } from "redux-test-utils";

import App from "./App";
import ProductList from "./containers/product-list/ProductList";
import Checkout from "./containers/checkout/Checkout";

import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Counter from "./components/counter/Counter";

import { PRODUCT_MOCK } from "./store/testing/product.mock";

const mockState = {
    products: { items: [PRODUCT_MOCK] },
	cart: { items: [PRODUCT_MOCK], size: 1 },
	currency: {}
};

describe("App", () => {
	let store;
	let container;

	beforeEach(() => {
		store = createMockStore(mockState);
		container = mount(
			<Provider store={store}>
                <App />
			</Provider>
		);
	});

	it("renders the component", () => {
		expect(container).toBeTruthy();
	});

	it("renders the header with a logo", () => {
		const header = container.find(Header);
        expect(header).toBeTruthy();
	});

	it("renders a product list", () => {
		const productList = container.find(ProductList);
		expect(productList).toBeTruthy();
	});

	it("renders the navbar with a cart counter", () => {
        const navBar = container.find(Navbar);
        expect(navBar).toBeTruthy();
        expect(navBar.props().children.type).toEqual(Counter);
    });
    
	it("passes the cart size to the counter", () => {
        const counter = container.find(Counter);
        expect(counter.props().count).toEqual(mockState.cart.size);
	});

	it("should have a modal with a checkout component", () => {
		const modal = container.find(Modal);
		const child = modal.find(Checkout);
		expect(modal).toBeTruthy();
		expect(child).toBeTruthy();
	});

	afterEach(() => container.unmount());
});
