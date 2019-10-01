import reducer from "./reducer";
import { CART_ACTIONS } from "./actions";

import { PRODUCT_MOCK } from "../testing/product.mock";

describe("Cart Reducer", () => {
	const initialState = { items: {}, size: 0, totalPrice: 0 };

	it("should return the initial state", () => {
		const state = reducer(initialState, {});
        expect(state).toEqual(initialState);
	});

	it("should handle addToCart", () => {
		const state = reducer(initialState, { type: CART_ACTIONS.addItem, payload: PRODUCT_MOCK });
		expect(state).toEqual({
			items: {
				[PRODUCT_MOCK.name]: {
					quantity: 1,
					price: PRODUCT_MOCK.price
				}
			},
			size: 1,
			totalPrice: initialState.totalPrice + PRODUCT_MOCK.price
		});
	});

	it("should handle removeFromCart", () => {
		let currentState = { 
			items: {
				[PRODUCT_MOCK.name]: {
					quantity: 2,
					price: PRODUCT_MOCK.price
				}
			},
			size: 2,
			totalPrice: PRODUCT_MOCK.price * 2
		};

		const state = reducer(currentState, { type: CART_ACTIONS.removeItem, payload: PRODUCT_MOCK });
		expect(state).toEqual({
			items: {
				[PRODUCT_MOCK.name]: {
					quantity: 1,
					price: PRODUCT_MOCK.price
				}
			},
			size: 1,
			totalPrice: PRODUCT_MOCK.price
		})
	});
});