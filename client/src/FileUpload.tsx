import React, { ChangeEvent } from 'react';

class FileUpload extends React.Component<{ onFileChange: (fileName: string, dataUrl: string) => void }> {

	state: { file: File | null } = { file: null }

	handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		if (!target?.files) return;
		this.setState({ file: target.files[0] });
	}

	onUploadClicked = async (event: React.MouseEvent) => {
		event.preventDefault();
		const that = this;
		if (this.state.file) {
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				if (reader.result && that.state.file) {
					const fileName = that.state.file.name;
					const dataUrl = reader.result.toString();
					that.props.onFileChange(fileName, dataUrl);
				}
			}, false);
			reader.readAsDataURL(this.state.file);
		}
	}

	render() {
		return (
			<div className="FileUpload">
				<input type="file" onChange={this.handleChange} />
				<button onClick={this.onUploadClicked}>Upload</button>
			</div>
		);
	}
}

export default FileUpload;
