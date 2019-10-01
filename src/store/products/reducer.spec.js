import reducer from "./reducer";
import { PRODUCT_ACTIONS } from "./actions";

import { PRODUCT_MOCK } from "../testing/product.mock";

describe("Products Reducer", () => {
    it("should return the initial state", () => {
        const state = reducer({}, {});
        expect(state).toEqual({});
    });

    it("should handle fetchProducts", () => {
        const state = reducer({}, { type: PRODUCT_ACTIONS.fetchProducts });
        state.items.map((item, i) => expect(item.key).toBe(i));
    });
});