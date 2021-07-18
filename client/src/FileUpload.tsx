import React, { ChangeEvent } from 'react';

class FileUpload extends React.Component {
	state: { file: File | null } = {
		file: null
	}

	handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		this.setState({
			file: target?.files ? target.files[0] : null
		});
	}

	onUploadClicked = async (event: React.MouseEvent) => {
		event.preventDefault();
		if (this.state.file !== null) {
			const data = await this.state.file.text();
			const buffer = Buffer.from(data, 'utf8');
			const base64Data = buffer.toString('base64');
			alert(base64Data);
		}
	}

	render() {
		return (
			<div className="FileUpload">
				<input type="file" onChange={this.handleChange} />
				<button onClick={this.onUploadClicked}>Upload</button>
				<br/>
				{this.state.file?.name}
			</div>
		);
	}
}

export default FileUpload;
