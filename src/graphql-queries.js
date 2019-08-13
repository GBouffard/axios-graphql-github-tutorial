const GET_REPOSITORY_ISSUES_GRAPHQL_QUERY = `
  query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`

const ADD_STAR_GRAPHQL_QUERY = `
  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`

const REMOVE_STAR_GRAPHQL_QUERY = `
  mutation ($repositoryId: ID!) {
    removeStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`

export {
  GET_REPOSITORY_ISSUES_GRAPHQL_QUERY,
  ADD_STAR_GRAPHQL_QUERY,
  REMOVE_STAR_GRAPHQL_QUERY
}
