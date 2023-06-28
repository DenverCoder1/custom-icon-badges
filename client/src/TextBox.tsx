import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/esm/Form';

/**
 * Text box for handling the slug input
 */
class TextBox extends React.Component<{ label: string, secondaryLabel: string, required: boolean | undefined, value: string, onInputChange: (slug: string) => void }> {
  handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { onInputChange } = this.props;
    onInputChange(event.target.value);
  }

  render = () => {
    const { label, secondaryLabel, required, value } = this.props;
    return <Form.Group className="mb-3">
      <Form.Label>{label} <span className="text-white-50">{secondaryLabel}</span></Form.Label>
      <Form.Control type="text"
        value={value}
        required={required}
        onChange={this.handleChangeEvent} />
    </Form.Group>
  };
}

export default TextBox;
