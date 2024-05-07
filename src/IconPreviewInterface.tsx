import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

const IconPreviewInterface = () => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [badgeUrl, setBadgeUrl] = useState('');

  const handleIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const icon = e.target.value;
    setSelectedIcon(icon);
    const url = `https://custom-icon-badges.demolab.com/badge/preview-${icon}-blue?logo=${icon}`;
    setPreviewUrl(url);
    setBadgeUrl(`https://custom-icon-badges.demolab.com/badge/your-badge-blue?logo=${icon}`);
  };

  return (
    <div>
      <h2>Icon Preview Interface</h2>
      <Form>
        <Form.Group controlId="iconSelect">
          <Form.Label>Select an Icon</Form.Label>
          <Form.Control as="select" value={selectedIcon} onChange={handleIconChange}>
            <option value="">Select an icon...</option>
            <option value="octicon">Octicon</option>
            <option value="feather">Feather</option>
            {/* Future options for other icon libraries can be added here */}
          </Form.Control>
        </Form.Group>
        {previewUrl && (
          <Card>
            <Card.Body>
              <Card.Title>Badge Preview</Card.Title>
              <img src={previewUrl} alt="Badge Preview" />
            </Card.Body>
          </Card>
        )}
        {badgeUrl && (
          <Form.Group controlId="badgeUrl">
            <Form.Label>Badge URL</Form.Label>
            <Form.Control type="text" readOnly value={badgeUrl} />
            <Button variant="primary" onClick={() => navigator.clipboard.writeText(badgeUrl)}>
              Copy URL
            </Button>
          </Form.Group>
        )}
      </Form>
    </div>
  );
};

export default IconPreviewInterface;
