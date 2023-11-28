import React from 'react';
import GitHubButton from 'react-github-btn';
import './GitHubButtons.scss';

/**
 * GitHub buttons to link to the sponsor page, repository, and stars
 */
function GitHubButtons(props: { user: string, repo: string }) {
  const { user, repo } = props;
  return (
    <div className="github-buttons">
      <GitHubButton href={`https://github.com/sponsors/${user}`}
        data-color-scheme="no-preference: dark_dimmed; light: light; dark: dark;"
        data-icon="octicon-heart" data-size="large"
        aria-label={`Sponsor @${user} on GitHub`}>Sponsor</GitHubButton>
      <GitHubButton href={`https://github.com/${user}/${repo}`}
        data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large"
        aria-label={`View ${user}/${repo} on GitHub`}>View on GitHub</GitHubButton>
      <GitHubButton href={`https://github.com/${user}/${repo}`}
        data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star"
        data-size="large" data-show-count="true" aria-label={`Star ${user}/${repo} on GitHub`}>Star</GitHubButton>
    </div>
  );
}

export default GitHubButtons;
