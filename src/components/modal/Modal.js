import React, { Component, Fragment } from "react";

import "./Modal.scss";

import Backdrop from "./../backdrop/Backdrop";

class Modal extends Component {
	shouldComponentUpdate(nextProps, _nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	render() {
		return (
			<Fragment>
				<Backdrop show={this.props.show} clicked={this.props.hide} />
				<div className={["modal", this.props.show ? "open" : "closed"].join(" ")}>
					{this.props.children}
				</div>
			</Fragment>
		);
	}
} 

export default Modal;