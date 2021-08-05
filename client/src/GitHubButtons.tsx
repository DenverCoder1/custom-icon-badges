import React from 'react';
import GitHubButton from 'react-github-btn';
import './GitHubButtons.scss';

function GitHubButtons(props: { user: string, repo: string }) {
  return (
    <div className="github-buttons">
      <GitHubButton href={`https://github.com/sponsors/${props.user}`}
        data-color-scheme="no-preference: dark_dimmed; light: light; dark: dark;"
        data-icon="octicon-heart" data-size="large"
        aria-label={`Sponsor @${props.user} on GitHub`}>Sponsor</GitHubButton>
      <GitHubButton href={`https://github.com/${props.user}/${props.repo}`}
        data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large"
        aria-label={`View ${props.user}/${props.repo} on GitHub`}>View on GitHub</GitHubButton>
      <GitHubButton href={`https://github.com/${props.user}/${props.repo}`}
        data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star"
        data-size="large" data-show-count="true" aria-label={`Star ${props.user}/${props.repo} on GitHub`}>Star</GitHubButton>
    </div>
  );
}

export default GitHubButtons;
