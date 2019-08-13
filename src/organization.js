import React, { Fragment } from 'react'

import Repository from './repository'
import { ErrorsComponent, RepositoryHeader } from './small-components'

const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
  onStarButtonClick
}) =>
  errors ? (
    <ErrorsComponent errors={errors} />
  ) : (
    <Fragment>
      <RepositoryHeader organization={organization} />
      <Repository
        repository={organization.repository}
        onFetchMoreIssues={onFetchMoreIssues}
        onStarButtonClick={onStarButtonClick}
      />
    </Fragment>
  )

export default Organization
