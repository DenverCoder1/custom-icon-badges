import React, { ChangeEvent } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import BadgePreview from './BadgePreview';
import FileUpload from "./FileUpload";
import TextBox from './TextBox';

class Form extends React.Component {

  state = {
    slug: "",
    fileType: "",
    data: "",
    previewUrl: "",
    message: ""
  }

  updateSlug = (slug: string) => {
    this.setState({ slug: slug });
  }

  updateFileData = (fileName: string, dataUrl: string) => {
    const match = dataUrl.match("data:image/(.*?);base64,(.*)");
    if (!match) return;
    this.setState({
      slug: fileName.split(".")[0],
      fileType: match[1],
      data: match[2],
      previewUrl: this.buildShieldUrl(dataUrl),
      message: ""
    });
  }

  handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // send post request to server
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: this.state.slug,
        type: this.state.fileType,
        data: this.state.data
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          this.setState({ message: `An error occurred: ${response.status} - ${response.statusText}` });
          return;
        }
        this.setState({ message: "Success!" });
      })
      .catch(error => {
        this.setState({ message: `An error occurred: ${error.message}` });
      });
  }

  buildShieldUrl = (dataUrl: string = "", text: string = "Preview", color: string = "#E61B23"): string => {
    dataUrl = encodeURIComponent(dataUrl);
    text = encodeURIComponent(text);
    color = encodeURIComponent(color);
    return `https://img.shields.io/badge/${text}-${color}.svg?logo=${dataUrl}`;
  }

  render = () => (
    <form onSubmit={this.handleSubmit} className="Form">
      <FileUpload label="Upload an image file"
        onFileChange={this.updateFileData} />
      <TextBox label="Pick a slug (name of the logo)"
        value={this.state.slug}
        onInputChange={this.updateSlug} />
      {this.state.previewUrl
        ? <BadgePreview label="Preview" url={this.state.previewUrl} />
        : null}
      {this.state.message
        ? <Alert variant="success">{this.state.message}</Alert>
        : null}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Form;
