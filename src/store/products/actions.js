export const PRODUCT_ACTIONS = {
    fetchProducts: "[Products] Fetch Items"
}

export const productActions = {
    fetchProducts() {
        return {
            type: PRODUCT_ACTIONS.fetchProducts
        }
    }
}