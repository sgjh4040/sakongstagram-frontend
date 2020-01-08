import { gql } from "apollo-boost";

export const SEARCH = gql`
    query searchUser($term: String!){
        searchUser(term: $term){
            id
            username
            avatar
            
        }
    }
`;
export const ROOMS_QUERY = gql`
    {
        seeRooms{
            id
            participants{
              id
              avatar
              username
            }
        }
        
    }
`;