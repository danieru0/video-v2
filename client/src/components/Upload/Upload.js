import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const UploadContainer = styled.div`
	width: calc(100% - 250px);
	height: calc(100vh - 80px);
	margin-top: 80px;
	margin-left: 250px;
	background: #FAFAFA;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const UploadFilePlace = styled.div`
	width: 100%;
	height: 100%;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const UploadFileIcon = styled(FontAwesome)`
	color: #10A074;
	font-size: 80px;
	transform: ${({dragging}) => dragging ? 'scale(1.2);' : 'scale(1)'}
`

const UploadFileText = styled.p`
	margin: 0;
	font-size: 32px;
	color: #10A074;
	font-family: 'Lato';
	margin-top: 15px;
`

const HiddenFileInput = styled.input`
	display: none;
`

class Upload extends Component {
	constructor() {
		super();
		this.state = {
			dragging: false,
			file: null
		}
	}

	inputRef = React.createRef();

	componentDidMount() {
		this.dragCounter = 0;
	}

	handleDrag = e => {
		e.preventDefault();
		e.stopPropagation();
	}

	handleDragIn = e => {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter++;
		this.setState({ dragging: true });
	}

	handleDragOut = e => {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter--;
		if (this.dragCounter > 0) return;
		this.setState({ dragging: false });
	}

	handleDrop = e => {    
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
			if (e.dataTransfer.files[0].type === 'video/mp4') {
				this.setState({ file: e.dataTransfer.files[0] });
			} else {
				alert('Wrong file type!');
			}
		} else {
			alert('Too much files! You can select only one file');
		}
	}

	handleInputChange = e => {
		if (e.target.files.length === 1) {
			if (e.target.files[0].type === 'video/mp4') {
				this.setState({ file: e.target.files[0] });
			} else {
				alert('Wrong file type!');
			}
		} else {
			alert('Too much files! You can select only one file');
		}
	}

	openFileInput = () => {
		this.inputRef.current.click();
	}

	render() {
		return (
			<UploadContainer>
				<UploadFilePlace onClick={this.openFileInput} onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut} onDragOver={this.handleDrag} onDrop={this.handleDrop}>
					<HiddenFileInput onChange={this.handleInputChange} ref={this.inputRef} type="file" accept="video/mp4"/>
					<UploadFileIcon dragging={this.state.dragging ? 1 : 0} name="upload" />
					<UploadFileText>Upload video by dragging or clicking here</UploadFileText>
				</UploadFilePlace>
			</UploadContainer>
		);
	}
}

export default Upload;