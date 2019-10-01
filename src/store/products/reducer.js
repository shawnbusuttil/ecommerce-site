import { PRODUCT_ACTIONS } from "./actions.js";

import data from "../../data/products.json";

const INITIAL_STATE = {
    items: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PRODUCT_ACTIONS.fetchProducts: {
            // This is only here for brevity. In a real application, this would be either put in a service or loaded from API dynamically.
            // You'd also have success or fail actions in reality, and update the UI according to the result.
            return { ...state, items: [...data.products] };
        }
        default:
            return state;
    }
};

export default reducer;