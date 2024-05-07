import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

const IconPreviewInterface = () => {
  const [iconSource, setIconSource] = useState('');
  const [availableIcons, setAvailableIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [badgeUrl, setBadgeUrl] = useState('');

  useEffect(() => {
    if (iconSource) {
      // Fetch the list of available icons based on the selected source
      fetch(`https://custom-icon-badges.demolab.com/api/icons?source=${iconSource}`)
        .then((response) => response.json())
        .then((data) => setAvailableIcons(data.icons))
        .catch((error) => console.error('Error fetching icons:', error));
    }
  }, [iconSource]);

  const handleIconSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIconSource(e.target.value);
  };

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
        <Form.Group controlId="iconSourceSelect">
          <Form.Label>Select an Icon Source</Form.Label>
          <Form.Control as="select" value={iconSource} onChange={handleIconSourceChange}>
            <option value="">Select an icon source...</option>
            <option value="octicons">Octicons</option>
            <option value="feather">Feather</option>
            {/* Future options for other icon sources can be added here */}
          </Form.Control>
        </Form.Group>
        {iconSource && (
          <Form.Group controlId="iconSelect">
            <Form.Label>Select an Icon</Form.Label>
            <Form.Control as="select" value={selectedIcon} onChange={handleIconChange}>
              <option value="">Select an icon...</option>
              {availableIcons.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
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
