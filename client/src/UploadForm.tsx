import React, { ChangeEvent } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import BadgePreview from "./BadgePreview";
import FileUpload from "./FileUpload";
import TextBox from "./TextBox";
import "./UploadForm.scss";

class UploadForm extends React.Component<{}, { slug: string, fileType: string, data: string, previewUrl: string, message: { type: string, content: JSX.Element }, isLoading: boolean }> {
  constructor(props = {}) {
    super(props);
    this.state = {
      slug: "",
      fileType: "",
      data: "",
      previewUrl: "",
      message: { type: "", content: <div /> },
      isLoading: false,
    };
  }

  updateSlug = (slug: string) => {
    this.setState({ slug: slug });
  };

  updateFileData = (fileName: string, dataUrl: string) => {
    const match = /data:image\/(.*?);base64,(.*)/.exec(dataUrl);
    if (!match) return;
    this.setState({
      slug: fileName.split(".")[0],
      fileType: match[1],
      data: match[2],
      previewUrl: this.buildShieldUrl(dataUrl),
      message: { type: "", content: <div /> },
    });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({
      isLoading: isLoading,
    });
  };

  setMessage = (
    type: string,
    heading: string,
    content: string,
    slug: string = ""
  ) => {
    this.setState({
      message: {
        type: type,
        content: (
          <div>
            <Alert.Heading>{heading}</Alert.Heading>
            <span>{content}</span>
            {slug && (
              <div>
                <hr />
                <span>
                  Now you can use <code>?logo={slug}</code> in your Custom Icon
                  Badges URL!
                </span>
              </div>
            )}
          </div>
        ),
      },
    });
  };

  handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    const { slug, fileType, data } = this.state;
    event.preventDefault();
    this.setIsLoading(true);
    // send post request to server
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: slug,
        type: fileType,
        data: data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // success message
        if ("type" in json && "message" in json && json.type === "success") {
          this.setMessage(
            "success",
            "Success!",
            json.message,
            json.body?.slug || ""
          );
          this.setIsLoading(false);
          return;
        }
        // error message
        if ("type" in json && "message" in json && json.type === "error") {
          this.setMessage("danger", "An error ocurred!", json.message);
          this.setIsLoading(false);
          return;
        }

        // default error
        this.setMessage(
          "danger",
          "An error occurred!",
          "Unknown error occurred!"
        );
        this.setIsLoading(false);
      })
      .catch((error) => {
        this.setMessage("danger", "An error occurred", `${error.message}`);
        this.setIsLoading(false);
      });
  };

  buildShieldUrl = (
    dataUrl: string = "",
    text: string = "Preview",
    color: string = "#E61B23"
  ): string => {
    const encodedDataUrl = encodeURIComponent(dataUrl);
    const encodedText = encodeURIComponent(text);
    const encodedColor = encodeURIComponent(color);
    return `https://img.shields.io/badge/${encodedText}-${encodedColor}.svg?logo=${encodedDataUrl}`;
  };

  render = () => {
    const { slug, previewUrl, message, isLoading } = this.state;
    return <Form onSubmit={this.handleSubmit} className="Form">
      <h3 className="d-flex justify-content-center">Add an icon</h3>
      <FileUpload
        label="Upload an image file"
        onFileChange={this.updateFileData}
      />
      <TextBox
        label="Pick a slug (name of the logo)"
        value={slug}
        onInputChange={this.updateSlug}
        required
      />
      <BadgePreview label="Preview" url={previewUrl} />
      {message.type ? (
        <Alert variant={message.type || undefined}>
          {message.content}
        </Alert>
      ) : null}
      <div className="d-grid gap-2">
        <Button
          type="submit"
          size="lg"
          className="submit-btn"
          disabled={!previewUrl || isLoading}
        >
          <div className={isLoading ? "loading-icon" : ""} />
          Submit
        </Button>
      </div>
    </Form>
  };
}

export default UploadForm;
