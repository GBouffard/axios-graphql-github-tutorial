import React from 'react'

const AppTitle = () => <h1>Axios Graphql Github tutorial</h1>

const NoInformationYet = () => <p>No information yet ...</p>

const ErrorsComponent = ({ errors }) => (
  <p>
    <strong>Something went wrong:</strong>
    {errors.map(error => error.message).join(' ')}
  </p>
)

const RepositoryHeader = ({ organization }) => (
  <p>
    <strong>Issues from Organization:</strong>
    <a href={organization.url}>{organization.name}</a>
  </p>
)

const RepositoryNameAndUrl = ({ repository }) => (
  <p>
    <strong>In Repository:</strong>
    <a href={repository.url}>{repository.name}</a>
  </p>
)

const StarButton = ({ repository, onClick }) => (
  <button
    type='button'
    onClick={() => onClick(repository.id, repository.viewerHasStarred)}
  >
    {repository.stargazers.totalCount}
    {repository.viewerHasStarred ? ' Unstar' : ' Star'}
  </button>
)

const MoreIssuesButton = ({ onClick }) => (
  <button onClick={onClick}>More</button>
)

export {
  AppTitle,
  NoInformationYet,
  ErrorsComponent,
  RepositoryHeader,
  RepositoryNameAndUrl,
  StarButton,
  MoreIssuesButton
}
