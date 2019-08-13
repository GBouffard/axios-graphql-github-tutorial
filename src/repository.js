import React, { Fragment } from 'react'

import {
  RepositoryNameAndUrl,
  StarButton,
  MoreIssuesButton
} from './small-components'

const IssueBulletPoint = ({ node }) => (
  <li key={node.id}>
    <a href={node.url}>{node.title}</a>

    <ul>
      {node.reactions.edges.map(reaction => (
        <li key={reaction.node.id}>{reaction.node.content}</li>
      ))}
    </ul>
  </li>
)

const IssueBulletPointList = ({ repository }) => (
  <ul>
    {repository.issues.edges.map(issue => (
      <IssueBulletPoint node={issue.node} key={issue.node.title} />
    ))}
  </ul>
)

const Repository = ({ repository, onFetchMoreIssues, onStarButtonClick }) => (
  <Fragment>
    <RepositoryNameAndUrl repository={repository} />

    <StarButton repository={repository} onClick={onStarButtonClick} />

    <IssueBulletPointList repository={repository} />

    <hr />
    {repository.issues.pageInfo.hasNextPage && (
      <MoreIssuesButton onClick={onFetchMoreIssues} />
    )}
  </Fragment>
)

export default Repository
