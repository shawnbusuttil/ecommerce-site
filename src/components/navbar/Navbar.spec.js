import React from "react";
import { mount } from "enzyme";

import Navbar from "./Navbar";

describe("Navbar", () => {
	let component;

    let navBarProps = {
        children: <div className="test-nav">Test Nav Item</div>
    };

	beforeEach(() => {
		component = mount(<Navbar {...navBarProps} />);
	});

	it("renders the component", () => {
		expect(component).toBeTruthy();
    });

    it("should have nested nav items", () => {
        const child = component.find(".test-nav");
        expect(child.text()).toBe("Test Nav Item");
    });

    afterEach(() => component.unmount());
});