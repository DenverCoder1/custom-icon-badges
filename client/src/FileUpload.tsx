import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/esm/Form';

/**
 * Class for handling the file upload form group
 */
class FileUpload extends React.Component<{ label: string, secondaryLabel: string, onFileChange: (fileName: string, dataUrl: string) => void }> {
	handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		if (!target?.files) return;
		const file = target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const { onFileChange } = this.props;
				if (!reader.result) return;
				// tell form that file is uploaded
				const fileName = file.name;
				const dataUrl = reader.result.toString();
				onFileChange(fileName, dataUrl);

			}, false);
			reader.readAsDataURL(file);
		}
	}

	render = () => {
		const { label, secondaryLabel } = this.props;
		return (
			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>{label} <span className="text-white-50">{secondaryLabel}</span></Form.Label>
				<Form.Control
					type="file"
					onChange={this.handleChange}
					accept=".png,.jpg,.jpeg,.svg" />
			</Form.Group>
		);
	}
}

export default FileUpload;
