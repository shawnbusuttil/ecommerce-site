import React from "react";
import { mount } from "enzyme";

import Backdrop from "../backdrop/Backdrop";
import Modal from "./Modal";

describe("Modal", () => {
	let component;

    let modalProps = {
        children: <div className="test-content">Test Modal Content</div>,
        show: true
    };

	beforeEach(() => {
		component = mount(<Modal {...modalProps} />);
	});

	it("renders the component", () => {
		expect(component).toBeTruthy();
    });

    it("should have nested content", () => {
        const child = component.find(".test-content");
        expect(child.text()).toBe("Test Modal Content");
    });

    it("should have a backdrop", () => {
        const backdrop = component.find(Backdrop);
        expect(backdrop).toBeTruthy();
    });

    afterEach(() => component.unmount());
});