import { CART_ACTIONS } from "./actions.js";

const INITIAL_STATE = {
    items: {},
    size: 0,
    totalPrice: 0
};

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CART_ACTIONS.addItem: {
            const item = action.payload;

            const quantity = state.items[item.name] ? state.items[item.name].quantity + 1 : 1;
            const price = item.price;

            return { 
                ...state, 
                items: {
                    ...state.items, 
                    [item.name]: {
                        quantity,
                        price
                    }
                },
                size: state.size + 1,
                totalPrice: state.totalPrice + item.price
            };
        }
        case CART_ACTIONS.removeItem: {
            const item = action.payload;

            const quantity = state.items[item.name].quantity - 1;
            const price = item.price;

            const items = { 
                ...state.items, 
                [item.name]: {
                    quantity,
                    price
                } 
            };

            if (quantity < 1) {
                delete items[item.name];
            }

            return {
                ...state,
                items,
                size: Math.max(state.size - 1, 0),
                totalPrice: Math.max(state.totalPrice - item.price, 0)
            };
        }
        default:
            return state;
    }
};

export default reducer;