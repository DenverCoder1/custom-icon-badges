import React from 'react';
import { Card, Form } from 'react-bootstrap';

class BadgePreview extends React.Component<{ url: string, label: string }> {
	render() {
		return (
			<Form.Group controlId="formFile" className="mb-3 d-flex align-items-center flex-column">
				<h3>{this.props.label}</h3>
				{
					this.props.url
						? <img className="m-2" src={this.props.url} alt="badge preview" />
						: <Card.Text className="text-muted m-2">Upload a file to see a preview</Card.Text>
				}
			</Form.Group>
		);
	}
}

export default BadgePreview;
