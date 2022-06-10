import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';

/**
 * Image for previewing a badge with a custom icon, or placeholder text if no image is uploaded
 */
class BadgePreview extends React.Component<{ url: string, label: string }> {
	render = () => {
		const { url, label } = this.props;
		return (
			<Form.Group controlId="formFile" className="mb-3 d-flex align-items-center flex-column">
				<h3>{label}</h3>
				{url ? <img className="m-2" src={url} alt="badge preview" /> : <Card.Text className="text-muted m-2">Upload a file to see a preview</Card.Text>}
			</Form.Group>
		);
	}
}

export default BadgePreview;
