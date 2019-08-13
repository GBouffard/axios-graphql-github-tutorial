import React, { Fragment, useState, useEffect } from 'react'

import {
  getIssuesOfRepository,
  resolveIssuesQuery,
  addStarToRepository,
  resolveAddStarMutation,
  removeStarFromRepository,
  resolveRemoveStarMutation
} from './helper'

import { AppTitle, NoInformationYet } from './small-components'
import Organization from './organization'

const initialPath = 'the-road-to-learn-react/the-road-to-learn-react'

const App = () => {
  const [path, setPath] = useState(initialPath)
  const [organization, setOrganization] = useState(null)
  const [errors, setErrors] = useState(null)

  const onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then(queryResult => {
      const resolvedIssuesQuery = resolveIssuesQuery(
        queryResult,
        cursor,
        organization
      )
      setOrganization(resolvedIssuesQuery.organization)
      setErrors(resolvedIssuesQuery.errors)
    })
  }

  const onFetchMoreIssues = () => {
    const { endCursor } = organization.repository.issues.pageInfo
    onFetchFromGitHub(path, endCursor)
  }

  const onSubmit = event => {
    onFetchFromGitHub(path)
    event.preventDefault()
  }

  const onStarButtonClick = (repositoryId, viewerHasStarred) => {
    if (viewerHasStarred) {
      removeStarFromRepository(repositoryId).then(mutationResult => {
        const resolvedRemoveStarMutation = resolveRemoveStarMutation(
          mutationResult,
          organization
        )
        setOrganization(resolvedRemoveStarMutation.organization)
      })
    } else {
      addStarToRepository(repositoryId).then(mutationResult => {
        const resolvedAddStarMutation = resolveAddStarMutation(
          mutationResult,
          organization
        )
        setOrganization(resolvedAddStarMutation.organization)
      })
    }
  }

  useEffect(() => {
    onFetchFromGitHub(path)
  }, [])

  return (
    <Fragment>
      <AppTitle />

      <form onSubmit={onSubmit}>
        <label htmlFor='url'>Show open issues for https://github.com/</label>
        <input
          id='url'
          type='text'
          value={path}
          onChange={event => setPath(event.target.value)}
          style={{ width: '300px' }}
        />
        <button type='submit'>Search</button>
      </form>

      <hr />

      {organization ? (
        <Organization
          organization={organization}
          errors={errors}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarButtonClick={onStarButtonClick}
        />
      ) : (
        <NoInformationYet />
      )}
    </Fragment>
  )
}

export default App
