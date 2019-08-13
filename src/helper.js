import axios from 'axios'

import {
  GET_REPOSITORY_ISSUES_GRAPHQL_QUERY,
  ADD_STAR_GRAPHQL_QUERY,
  REMOVE_STAR_GRAPHQL_QUERY
} from './graphql-queries'

const apiBaseUrl = 'https://api.github.com/graphql'

const axiosGitHubGraphQL = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`
  }
})

const getIssuesOfRepository = (path, cursor) => {
  const [organization, repository] = path.split('/')

  return axiosGitHubGraphQL.post('', {
    query: GET_REPOSITORY_ISSUES_GRAPHQL_QUERY,
    variables: { organization, repository, cursor }
  })
}

const resolveIssuesQuery = (queryResult, cursor, organization) => {
  const { data, errors } = queryResult.data

  if (!cursor) {
    return {
      organization: data.organization,
      errors
    }
  }

  const { edges: oldIssues } = organization.repository.issues
  const { edges: newIssues } = data.organization.repository.issues

  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: [...oldIssues, ...newIssues]
        }
      }
    },
    errors
  }
}

const addStarToRepository = repositoryId =>
  axiosGitHubGraphQL.post('', {
    query: ADD_STAR_GRAPHQL_QUERY,
    variables: { repositoryId }
  })

const resolveAddStarMutation = (mutationResult, organization) => {
  const { viewerHasStarred } = mutationResult.data.data.addStar.starrable
  const { totalCount } = organization.repository.stargazers

  return {
    organization: {
      ...organization,
      repository: {
        ...organization.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount + 1
        }
      }
    }
  }
}

const removeStarFromRepository = repositoryId =>
  axiosGitHubGraphQL.post('', {
    query: REMOVE_STAR_GRAPHQL_QUERY,
    variables: { repositoryId }
  })

const resolveRemoveStarMutation = (mutationResult, organization) => {
  const { viewerHasStarred } = mutationResult.data.data.removeStar.starrable
  const { totalCount } = organization.repository.stargazers

  return {
    organization: {
      ...organization,
      repository: {
        ...organization.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount - 1
        }
      }
    }
  }
}

export {
  getIssuesOfRepository,
  resolveIssuesQuery,
  addStarToRepository,
  resolveAddStarMutation,
  removeStarFromRepository,
  resolveRemoveStarMutation
}
