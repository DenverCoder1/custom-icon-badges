import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';

/**
 * Image for previewing a badge with a custom icon, or placeholder text if no image is uploaded
 */
class BadgePreview extends React.Component<{ url: string, label: string, onPreviewSuccessfulChange: (isSuccessful: boolean) => void }> {
	handleSuccess = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const target = event.target as HTMLImageElement;
		if (!target.src.includes("failed%20to%20load")) {
			this.props.onPreviewSuccessfulChange(true)
		}
	}

	handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const target = event.target as HTMLImageElement;
		if (!target.src.includes("critical")) {
			this.props.onPreviewSuccessfulChange(false)
			target.src = "https://custom-icon-badges.demolab.com/badge/failed%20to%20load-try%20compressing%20the%20image%20to%20make%20it%20smaller-critical?logo=x-circle-fill";
		}
	}

	render = () => {
		const { url, label } = this.props;
		return (
			<Form.Group controlId="formFile" className="mb-3 d-flex align-items-center flex-column">
				<h3>{label}</h3>
				{url ? <img className="m-2" src={url} alt="badge preview" onLoad={this.handleSuccess} onError={this.handleError} /> : <Card.Text className="text-white-50 m-2">Upload a file to see a preview</Card.Text>}
			</Form.Group>
		);
	}
}

export default BadgePreview;
