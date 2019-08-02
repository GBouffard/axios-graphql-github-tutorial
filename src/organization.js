import React, { Fragment } from "react";

import Repository from "./repository";

const ErrorsComponent = ({ errors }) => (
  <p>
    <strong>Something went wrong:</strong>
    {errors.map(error => error.message).join(" ")}
  </p>
);

const RepositoryHeader = ({ organization }) => (
  <p>
    <strong>Issues from Organization:</strong>
    <a href={organization.url}>{organization.name}</a>
  </p>
);

const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
  onStarRepository
}) =>
  errors ? (
    <ErrorsComponent errors={errors} />
  ) : (
    <Fragment>
      <RepositoryHeader organization={organization} />
      <Repository
        repository={organization.repository}
        onFetchMoreIssues={onFetchMoreIssues}
        onStarRepository={onStarRepository}
      />
    </Fragment>
  );

export default Organization;
