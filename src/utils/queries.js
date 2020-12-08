import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($user: String!) {
    search(query: $user, type: USER, first: 5) {
      edges {
        node {
          ... on User {
            login
            name
            company
            avatarUrl(size: 200)        
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories($owner: String!){
    user(login: $owner) {
      repositories(first: 30, ownerAffiliations: OWNER) {
        edges {
          node {
            name
            stargazerCount
            watchers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const GET_ISSUES = gql`
  query GetIssues($owner: String!, $repoName: String!) {
    user(login: $owner) {
      repository(name: $repoName) {
        issues(first: 10, states: OPEN) {
          edges {
            node {
              author {
                login
              }
              title
              createdAt
            }
          }
        }
      }
    }
  }
`;