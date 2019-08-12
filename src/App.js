import React, { useState, useEffect } from "react";

import {
  getIssuesOfRepository,
  resolveIssuesQuery,
  addStarToRepository,
  resolveAddStarMutation,
  removeStarFromRepository,
  resolveRemoveStarMutation
} from "./helper";

import Organization from "./organization";

const App = () => {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );
  const [organization, setOrganization] = useState(null);
  const [errors, setErrors] = useState(null);

  const onChange = event => {
    setPath(event.target.value);
  };

  const onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then(queryResult => {
      const resolvedIssuesQuery = resolveIssuesQuery(
        queryResult,
        cursor,
        organization
      );
      setOrganization(resolvedIssuesQuery.organization);
      setErrors(resolvedIssuesQuery.errors);
    });
  };

  const onFetchMoreIssues = () => {
    const { endCursor } = organization.repository.issues.pageInfo;
    // console.log("------", endCursor);
    onFetchFromGitHub(path, endCursor);
  };

  const onSubmit = event => {
    onFetchFromGitHub(path);
    event.preventDefault();
  };

  const onStarRepository = (repositoryId, viewerHasStarred) => {
    if (viewerHasStarred) {
      removeStarFromRepository(repositoryId).then(mutationResult => {
        const resolvedRemoveStarMutation = resolveRemoveStarMutation(
          mutationResult,
          organization
        );
        setOrganization(resolvedRemoveStarMutation.organization);
      });
    } else {
      addStarToRepository(repositoryId).then(mutationResult => {
        const resolvedAddStarMutation = resolveAddStarMutation(
          mutationResult,
          organization
        );
        setOrganization(resolvedAddStarMutation.organization);
      });
    }
  };

  useEffect(() => {
    onFetchFromGitHub(path);
  }, []);

  return (
    <div>
      <h1>Axios Graphql Github tutorial</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="url">Show open issues for https://github.com/</label>
        <input
          id="url"
          type="text"
          value={path}
          onChange={onChange}
          style={{ width: "300px" }}
        />
        <button type="submit">Search</button>
      </form>

      <hr />

      {organization ? (
        <Organization
          organization={organization}
          errors={errors}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarRepository={onStarRepository}
        />
      ) : (
        <p>No information yet ...</p>
      )}
    </div>
  );
};

export default App;
