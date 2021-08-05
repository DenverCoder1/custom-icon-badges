import React, { ChangeEvent } from 'react';

class FileUpload extends React.Component {
	state: { file: File | null, url: string, data: string } = {
		file: null,
		data: "",
		url: ""
	}

	handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		this.setState({
			file: target?.files ? target.files[0] : null
		});
	}

	buildUrl = (dataUrl: string = "", text: string = "Preview", color: string = "%23E61B23"): string => {
		return `https://img.shields.io/badge/${text}-${color}.svg?logo=${dataUrl}`;
	}

	onUploadClicked = async (event: React.MouseEvent) => {
		event.preventDefault();
		const that = this;
		if (this.state.file !== null) {
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				// convert image file to base64 string
				that.setState({
					data: reader.result,
					url: that.buildUrl(reader.result?.toString())
				});
			}, false);
			reader.readAsDataURL(this.state.file);
		}
	}

	render() {
		return (
			<div className="FileUpload">
				<input type="file" onChange={this.handleChange} />
				<button onClick={this.onUploadClicked}>Upload</button>
				<br />
				{this.state.url
					? <img src={this.state.url} alt="badge preview" />
					: null}
			</div>
		);
	}
}

export default FileUpload;
