import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import ProductList from "./containers/product-list/ProductList";
import Checkout from './containers/checkout/Checkout';

import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Counter from "./components/counter/Counter";

import icon from "./icons/basket.svg";

class App extends Component {
  state = {
    isCheckingOut: false
  };

  openCheckout = () => {
    this.setState({ isCheckingOut: true });
  }

  closeCheckout = () => {
    this.setState({ isCheckingOut: false });
  }

  render() {
    return <Fragment>
      <Header />
      <Navbar>
        <Counter count={this.props.numOfItems} image={icon} clicked={this.props.numOfItems > 0 ? this.openCheckout : null} />
      </Navbar>
      <ProductList />
      {/* For brevity. In reality, this modal will use the Router/Lazy Loading. */}
      <Modal show={this.state.isCheckingOut} hide={this.closeCheckout}>
        <Header />
        <Checkout complete={this.closeCheckout} />
      </Modal>
    </Fragment>
  }
}

const mapStateToProps = (state) => {
  return {
      numOfItems: state.cart.size
  };
}

export default connect(mapStateToProps)(App);
