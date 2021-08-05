import React, { ChangeEvent } from 'react';

class TextBox extends React.Component<{ value: string, onInputChange: (slug: string) => void }> {
  handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onInputChange(event.target.value);
  }

  render = () => (
    <div>
      <input type="text"
        value={this.props.value}
        onChange={this.handleChangeEvent} />
    </div>
  );
}

export default TextBox;
