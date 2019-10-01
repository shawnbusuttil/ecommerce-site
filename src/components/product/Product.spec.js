import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";

import Product from "./Product";
import Image from "../image/Image";

import { PRODUCT_MOCK } from "../../store/testing/product.mock";

describe("Product", () => {
	let component;

    let productProps = {
        info: PRODUCT_MOCK,
        quantity: 0
    };

	beforeEach(() => {
		component = mount(<Product {...productProps} />);
	});

	it("renders the component", () => {
		expect(component).toBeTruthy();
    });

    it("should have a name", () => {
        const name = component.find(".product-info-name");
        expect(name.text()).toBe(PRODUCT_MOCK.name);
    });

    it("should have a price", () => {
        const pricing = component.find(".product-info-price");
        expect(pricing.text()).toBe(`£${(PRODUCT_MOCK.price / 100).toFixed(2)}`);
    });

    it("should show the add button when there is none of the item in cart", () => {
        const addBtn = component.find(".product-controls-add");
        expect(addBtn.length).toBe(1);
    });

    it("should not show increment and decrement controls when the item is not in cart", () => {
        const incBtn = component.find(".product-controls-increment");
        const decBtn = component.find(".product-controls-decrement");
        expect(incBtn.length).toBe(0);
        expect(decBtn.length).toBe(0);
    });

    it("should show increment and decrement controls when the item is in cart", () => {
        productProps.quantity = 2;
        component = mount(<Product {...productProps} />);

        const incBtn = component.find(".product-controls-increment");
        const decBtn = component.find(".product-controls-decrement");
        expect(incBtn.length).toBe(1);
        expect(decBtn.length).toBe(1);
    });

    it("should have an image", () => {
       const img = component.find(Image);
       expect(img.length).toBe(1);
    });

    it("should add an item when add item is clicked", () => {
        productProps.info = PRODUCT_MOCK;
        productProps.quantity = 0;
        productProps.addItem = sinon.spy();

        component = mount(<Product {...productProps} />);

        component.find(".product-controls-add").simulate("click");
        expect(productProps.addItem.calledOnce).toBeTruthy();
    });

    it("should add an item when remove item is clicked", () => {
        productProps.info = PRODUCT_MOCK;
        productProps.quantity = 2;
        productProps.removeItem = sinon.spy();

        component = mount(<Product {...productProps} />);

        component.find(".product-controls-decrement").simulate("click");
        expect(productProps.removeItem.calledOnce).toBeTruthy();
    });

    afterEach(() => component.unmount());
});