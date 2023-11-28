import React, { ChangeEvent } from "react";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import BadgePreview from "./BadgePreview";
import FileUpload from "./FileUpload";
import TextBox from "./TextBox";
import "./UploadForm.scss";

/**
 * Class for handling the upload form
 */
class UploadForm extends React.Component<{}, { slug: string, type: string, data: string, previewUrl: string, previewSuccessful: boolean, message: { type: string, content: JSX.Element }, isLoading: boolean }> {  // skipcq: JS-0296
  constructor(props = {}) {
    super(props);
    this.state = {
      slug: "",
      type: "",
      data: "",
      previewUrl: "",
      message: { type: "", content: <div /> },
      isLoading: false,
      previewSuccessful: false,
    };
  }

  updateSlug = (slug: string) => {
    this.setState({ slug });
  };

  updateFileData = (fileName: string, dataUrl: string) => {
    const match = /data:image\/(.*?);base64,(.*)/.exec(dataUrl);
    if (!match) return;
    this.setState({
      slug: fileName.split(".")[0],
      type: match[1],
      data: match[2],
      previewUrl: UploadForm.buildShieldUrl(dataUrl),
      message: { type: "", content: <div /> },
    });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  setMessage = (
    type: string,
    heading: string,
    content: string,
    slug: string = ""
  ) => {
    this.setState({
      message: {
        type,
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
    const { slug, type, data } = this.state;
    event.preventDefault();
    this.setIsLoading(true);
    // send post request to server
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, type, data }),
      });
      const json = await response.json();
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
    } catch (error: unknown) {
      if (typeof error === "string") {
        this.setMessage("danger", "An error occurred!", error);
      } else if (error instanceof Error) {
        this.setMessage("danger", "An error occurred!", `${error.message}`);
      }
      this.setIsLoading(false);
    }
  };
  
  handlePreviewSuccessChange = (isSuccessful: boolean) => {
    this.setState({previewSuccessful: isSuccessful});
  };

  static buildShieldUrl = (
    dataUrl: string = "",
    label: string = "badge",
    message: string = "preview",
    color: string = "success"
  ): string => {
    const encodedDataUrl = encodeURIComponent(dataUrl);
    const encodedLabel = encodeURIComponent(label);
    const encodedMessage = encodeURIComponent(message);
    const encodedColor = encodeURIComponent(color);
    return `https://img.shields.io/badge/${encodedLabel}-${encodedMessage}-${encodedColor}.svg?logo=${encodedDataUrl}`;
  };

  render = () => {
    const { slug, previewUrl, previewSuccessful, message, isLoading } = this.state;
    return <Form onSubmit={this.handleSubmit} className="Form">
      <h3 className="d-flex justify-content-center">Add an icon</h3>
      <FileUpload
        label="Upload an image file"
        secondaryLabel="(Maximum size: ≈9kB)"
        onFileChange={this.updateFileData}
      />
      <TextBox
        label="Pick a slug"
        secondaryLabel="(Name of the logo)"
        value={slug}
        onInputChange={this.updateSlug}
        required
      />
      <BadgePreview label="Preview" url={previewUrl} onPreviewSuccessfulChange={this.handlePreviewSuccessChange} />
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
          disabled={!previewUrl || isLoading || !previewSuccessful}
        >
          <div className={isLoading ? "loading-icon" : ""} />
          Submit
        </Button>
      </div>
    </Form>
  };
}

export default UploadForm;
