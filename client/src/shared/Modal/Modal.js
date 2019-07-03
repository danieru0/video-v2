import React, { Component } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	background: rgba(0,0,0,0.4);
	z-index: 99999;
	display: flex;
	justify-content: center;
	align-items: center;
`

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	modalRef = React.createRef();

	componentDidMount() {
		this.modalRef.current.addEventListener('mousedown', this.handleOutsideClick);
		document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		this.modalRef.current.removeEventListener('mousedown', this.handleOutsideClick);
		document.body.style.overflow = 'auto';
	}

	handleOutsideClick = e => {
		if (e.target.id === this.modalRef.current.id) {
			if (e.which === 1) this.props.onExit();
		}
	}

	render() {
		return (
			<ModalContainer id="videov2-modal" ref={this.modalRef}>
				{this.props.children}
			</ModalContainer>
		);
	}
}

export default Modal;