import React, { ChangeEvent } from 'react';
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
    const match = dataUrl.match("data:(.*?);base64,(.*)");
    if (!match) return;
    this.setState({
      slug: fileName.split(".")[0],
      fileType: match[1],
      data: match[2],
      previewUrl: this.buildShieldUrl(dataUrl)
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
    <form onSubmit={this.handleSubmit}>
      <label>
        Select an image
        <FileUpload onFileChange={this.updateFileData} />
      </label>
      <label>
        Pick a slug (name of the logo)
        <TextBox value={this.state.slug} onInputChange={this.updateSlug} />
      </label>
      {this.state.previewUrl
        ? (
          <div>
            <h3>Preview</h3>
            <img src={this.state.previewUrl} alt="badge preview" />
          </div>
        )
        : null}
      {this.state.message
        ? (
          <div>
            {this.state.message}
          </div>
        )
        : null}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
