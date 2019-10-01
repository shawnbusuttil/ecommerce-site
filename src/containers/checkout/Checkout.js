import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { fetchCurrencies, currencyActions } from "../../store/currency/actions";

import "./Checkout.scss";
import { DEFAULT_CURRENCY } from "../../store/currency/reducer";

class Checkout extends Component {
    async componentDidMount() {
        await this.props.fetchCurrencies();
    }

    render() {
        let checkoutView;
        const { source, target, quotes } = this.props.currencyData;
    
        checkoutView = <p>There was some trouble loading data.</p>;

        if (quotes) {
            const currencyCode = target.substring(3);

            const itemsView = <div className="checkout-items">
                {Object.keys(this.props.items).map(item => {
                    // Line 23 is needed because the free plan of the API doesn't support non-USD sources without subscription.
                    const convToSource = this.props.items[item].price / quotes[source + DEFAULT_CURRENCY];
                    return <p key={item}>{item}: x{this.props.items[item].quantity} ({(convToSource * quotes[target] / 100).toFixed(2)} {currencyCode})</p>;
                })}
            </div>;

            const exchangeRates = <select value={target} onChange={(e) => this.props.changeCurrency(e.target.value)}>
                {Object.keys(quotes).map(rate => <option key={rate} value={rate}>{rate.substring(3)}</option>)}
            </select>;

            const totalPrice = (this.props.totalPrice / quotes[source + DEFAULT_CURRENCY]) * quotes[target];
            const totalPriceView = <p className="checkout-total">Total: {(totalPrice / 100).toFixed(2)} {exchangeRates}</p>;

            checkoutView = <Fragment>
                {itemsView}
                {totalPriceView}
                <button onClick={this.props.complete}>Checkout</button>
            </Fragment>
        }

        return <div className="checkout">
            {checkoutView}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cart.items,
        totalPrice: state.cart.totalPrice,
        currencyData: state.currency
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrency: (target) => dispatch(currencyActions.changeCurrency(target)),
        fetchCurrencies: () => dispatch(fetchCurrencies())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);