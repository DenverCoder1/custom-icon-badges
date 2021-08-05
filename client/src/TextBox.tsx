import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/esm/Form';

class TextBox extends React.Component<{ label: string, required: boolean | undefined, value: string, onInputChange: (slug: string) => void }> {
  handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onInputChange(event.target.value);
  }

  render = () => (
    <Form.Group className="mb-3">
      <Form.Label>{this.props.label}</Form.Label>
      <Form.Control type="text"
        value={this.props.value}
        required={this.props.required}
        onChange={this.handleChangeEvent} />
    </Form.Group>
  );
}

export default TextBox;
