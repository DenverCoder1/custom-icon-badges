import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/esm/Form';

class FileUpload extends React.Component<{ label: string, onFileChange: (fileName: string, dataUrl: string) => void, setMessage: (type: string, text: string) => void }> {

	handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const props = this.props;
		const target = event.target as HTMLInputElement;
		if (!target?.files) return;
		const file = target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				if (!reader.result) return;
				// files must be less than 8kb
				if (file.size > 8 * 1024) {
					props.setMessage("danger", "File must be less than 8kb");
					return;
				}
				// tell form that file is uploaded
				const fileName = file.name;
				const dataUrl = reader.result.toString();
				props.onFileChange(fileName, dataUrl);

			}, false);
			reader.readAsDataURL(file);
		}
	}

	render() {
		return (
			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>{this.props.label}</Form.Label>
				<Form.Control
					type="file"
					onChange={this.handleChange}
					accept=".png,.jpg,.jpeg,.svg" />
			</Form.Group>
		);
	}
}

export default FileUpload;
