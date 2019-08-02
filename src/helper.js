import axios from "axios";

import {
  GET_REPOSITORY_ISSUES_GRAPHQL_QUERY,
  ADD_STAR_GRAPHQL_QUERY,
  REMOVE_STAR_GRAPHQL_QUERY
} from "./graphql-queries";

const apiBaseUrl = "https://api.github.com/graphql";

// a personal access token from Github is needed
const axiosGitHubGraphQL = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`
  }
});

const getIssuesOfRepository = (path, cursor) => {
  // example nodejs/node
  const [organization, repository] = path.split("/");

  return axiosGitHubGraphQL.post("", {
    query: GET_REPOSITORY_ISSUES_GRAPHQL_QUERY,
    variables: { organization, repository, cursor }
  });
};

const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;

  if (!cursor) {
    return {
      organization: data.organization,
      errors
    };
  }

  const { edges: oldIssues } = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues
        }
      }
    },
    errors
  };
};

const addStarToRepository = repositoryId =>
  axiosGitHubGraphQL.post("", {
    query: ADD_STAR_GRAPHQL_QUERY,
    variables: { repositoryId }
  });

const resolveAddStarMutation = mutationResult => state => {
  const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;
  const { totalCount } = state.organization.repository.stargazers;

  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount + 1
        }
      }
    }
  };
};

const removeStarFromRepository = repositoryId =>
  axiosGitHubGraphQL.post("", {
    query: REMOVE_STAR_GRAPHQL_QUERY,
    variables: { repositoryId }
  });

const resolveRemoveStarMutation = mutationResult => state => {
  const { viewerHasStarred } = mutationResult.data.data.removeStar.starrable;
  const { totalCount } = state.organization.repository.stargazers;

  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount - 1
        }
      }
    }
  };
};

export {
  getIssuesOfRepository,
  resolveIssuesQuery,
  addStarToRepository,
  resolveAddStarMutation,
  removeStarFromRepository,
  resolveRemoveStarMutation
};
