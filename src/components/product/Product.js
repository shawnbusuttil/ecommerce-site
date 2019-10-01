import React from "react";

import "./Product.scss";

import Image from "./../image/Image";

const Product = (props) => {
    let controlsView = props.quantity > 0 ? <div>
        <button className="product-controls-btn product-controls-decrement" onClick={props.removeItem}>-</button>
        <span className="product-controls-counter">{props.quantity}</span>
        <button className="product-controls-btn product-controls-increment" onClick={props.addItem}>+</button>
    </div> : <button className="product-controls-add" onClick={props.addItem}>Add</button>

    return <div className="product">
        <Image src={props.info.image} alt={props.info.name} width="100" height="100">
            {props.quantity > 0 ? <div className="overlay">{`${props.quantity} in basket`}</div> : null}
        </Image>
        <div className="product-info">
            <h3 className="product-info-name">{props.info.name}</h3>
            <p className="product-info-price">&#163;{(props.info.price / 100).toFixed(2)}</p>
        </div>
        <div className="product-controls">
            {controlsView}
        </div>
    </div>
};

export default Product;