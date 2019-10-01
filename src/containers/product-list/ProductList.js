import React, { Component } from "react";
import { connect } from "react-redux";

import Product from "../../components/product/Product";

import { cartActions } from "../../store/cart/actions";
import { productActions } from "../../store/products/actions";

import "./ProductList.scss";

class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        // If this was async, it'd be handled differently: with a loading state feedback and fallback text.
        return this.props.products ? <div className="product-list">
            {this.props.products.map(product => {
                return <Product key={product.key} info={product} quantity={this.props.cart[product.name] && this.props.cart[product.name].quantity}
                    addItem={() => this.props.addToCart(product)} 
                    removeItem={() => this.props.removeFromCart(product)} />
            })}
        </div> : <p>There are no products.</p>
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.items,
        products: state.products.items
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(productActions.fetchProducts()),
        addToCart: (item) => dispatch(cartActions.addItem(item)),
        removeFromCart: (item) => dispatch(cartActions.removeItem(item))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);