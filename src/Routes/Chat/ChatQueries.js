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

export const SEE_ROOM = gql`
    query seeRoom($id:String!){
        seeRoom(id: $id){
            id
            participants{
                username
            }
            messages{
            id
            text
            createdAt
            from{
                id
            }
            }
        }
    }
`;
export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId:String, $message:String!, $toId:String) {
    sendMessage(roomId: $roomId message: $message toId: $toId) {
      id
      text
      room{
        id
        messages{
            id
            text
            from{
                id
            }
        }
      }
    }
  }
`;
export const NEW_MESSAGE = gql`
    subscription newMessage($roomId: String!){
        newMessage(roomId: $roomId){
            id
            text
            from{
                id
            }
        }
    
    }
`;