import React from 'react';
import Form from 'react-bootstrap/esm/Form';

class BadgePreview extends React.Component<{ url: string, label: string }> {
	render() {
		return (
			<Form.Group controlId="formFile" className="mb-3">
				<h3>{this.props.label}</h3>
				<img src={this.props.url} alt="badge preview" />
			</Form.Group>
		);
	}
}

export default BadgePreview;
