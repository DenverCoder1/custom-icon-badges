import React, { ChangeEvent } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import BadgePreview from './BadgePreview';
import FileUpload from "./FileUpload";
import TextBox from './TextBox';
import './UploadForm.scss';

class UploadForm extends React.Component {

  state = {
    slug: "",
    fileType: "",
    data: "",
    previewUrl: "",
    message: { type: "", content: <div></div> }
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
      message: { type: "", content: <div></div> }
    });
  }

  setMessage = (type: string, heading: string, content: string, slug: string = "") => {
    this.setState({
      message: {
        type: type,
        content: (
          <div>
            <Alert.Heading>{heading}</Alert.Heading>
            <span>{content}</span>
            {slug && <div><hr /><span>Now you can use <code>?logo={slug}</code> in your Custom Icon Badges URL!</span></div>}
          </div>
        )
      }
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
      .then(response => response.json())
      .then(json => {
        // success message
        if ("type" in json && "message" in json && json.type === "success") {
          this.setMessage("success", "Success!", json.message, json.body?.slug || "");
          return;
        }
        // error message
        if ("type" in json && "message" in json && json.type === "error") {
          this.setMessage("danger", "An error ocurred!", json.message);
          return;
        }
        // default error
        this.setMessage("danger", "An error occurred!", "Unknown error occurred!");
      })
      .catch(error => this.setMessage("danger", "An error occurred", `${error.message}`));
  }

  buildShieldUrl = (dataUrl: string = "", text: string = "Preview", color: string = "#E61B23"): string => {
    dataUrl = encodeURIComponent(dataUrl);
    text = encodeURIComponent(text);
    color = encodeURIComponent(color);
    return `https://img.shields.io/badge/${text}-${color}.svg?logo=${dataUrl}`;
  }

  render = () => (
    <Form onSubmit={this.handleSubmit} className="Form">
      <h3 className="d-flex justify-content-center">Add an icon</h3>
      <FileUpload label="Upload an image file"
        setMessage={this.setMessage}
        onFileChange={this.updateFileData} />
      <TextBox label="Pick a slug (name of the logo)"
        value={this.state.slug} required={true}
        onInputChange={this.updateSlug} />
      <BadgePreview label="Preview" url={this.state.previewUrl} />
      {this.state.message.type
        ? (
          <Alert variant={this.state.message.type || undefined}>
            {this.state.message.content}
          </Alert>
        )
        : null}
      <div className="d-grid gap-2">
        <Button type="submit" size="lg"
          disabled={!this.state.previewUrl}>Submit</Button>
      </div>
    </Form>
  );
}

export default UploadForm;
