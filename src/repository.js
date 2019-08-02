import React, { Fragment } from "react";

const RepositoryHeader = ({ repository }) => (
  <p>
    <strong>In Repository:</strong>
    <a href={repository.url}>{repository.name}</a>
  </p>
);

const StarButton = ({ repository, onStarRepository }) => (
  <button
    type="button"
    onClick={() => onStarRepository(repository.id, repository.viewerHasStarred)}
  >
    {repository.stargazers.totalCount}
    {repository.viewerHasStarred ? " Unstar" : " Star"}
  </button>
);

const IssueBulletPoint = ({ node }) => (
  <li key={node.id}>
    <a href={node.url}>{node.title}</a>

    <ul>
      {node.reactions.edges.map(reaction => (
        <li key={reaction.node.id}>{reaction.node.content}</li>
      ))}
    </ul>
  </li>
);

const Repository = ({ repository, onFetchMoreIssues, onStarRepository }) => (
  <Fragment>
    <RepositoryHeader repository={repository} />

    <StarButton repository={repository} onStarRepository={onStarRepository} />

    <ul>
      {repository.issues.edges.map(issue => (
        <IssueBulletPoint node={issue.node} />
      ))}
    </ul>

    <hr />
    {repository.issues.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreIssues}>More</button>
    )}
  </Fragment>
);

export default Repository;
