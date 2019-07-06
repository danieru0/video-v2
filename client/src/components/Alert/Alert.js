import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AlertContainer = styled.div`
	position: fixed;
	left: 20px;
	bottom: 20px;
	z-index: 9999999999999;
	min-width: 220px;
	height: 50px;
	background: ${({alertType}) => alertType === 'normal' ? '#000' : 'red'};
	font-family: 'Lato';
	font-size: 18px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	overflow: hidden;
	transform: translateY(150%);
	transition: transform .3s;
`

const AlertText = styled.p`
	margin: 0;
	padding: 0px 30px;
`

class Alert extends Component {
	alertRef = React.createRef();

	componentDidUpdate(prevProps) {
		if (prevProps.alert !== this.props.alert) {
			this.alertRef.current.style.transform = 'translateY(0)';
			setTimeout(() => {
				this.alertRef.current.style.transform = 'translateY(150%)';
			}, 3000);
		}
	}

	render() {
		const { message, alertType } = this.props;
		return (
			<AlertContainer alertType={alertType} ref={this.alertRef}>
				<AlertText>{message}</AlertText>
			</AlertContainer>
		)
	}
};

const mapStateToProps = state => {
	return {
		alert: state.alertReducer.alert,
		alertType: state.alertReducer.alertType,
		message: state.alertReducer.message
	}
}

Alert.propTypes = {
	alertType: PropTypes.oneOf(['normal', 'error']).isRequired,
	message: PropTypes.string.isRequired 
}

export default connect(mapStateToProps, null)(Alert);