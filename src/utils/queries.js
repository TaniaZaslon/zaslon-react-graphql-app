import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query($user: String!) {
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
query{
  user(login: "Zaslon") {
    repositories(first: 10) {
      edges {
        node {
          name
          stargazerCount
          watchers {
            totalCount
          }
        }s
      }
    }
  }
}
`;