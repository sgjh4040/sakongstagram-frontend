
import { gql } from '@apollo/client';

export const SEARCH = gql`
    query searchUser($term: String!){
        searchUser(term: $term){
            id
            username
            avatar         
        }
    }
`;
export const CREATE_ROOM = gql`
    mutation createRoom($toId: String!){
        createRoom(toId:$toId){
            id
        }
    }

`;
export const UPDATE_UNREAD = gql`
    mutation updateRead($roomId: String!){
        updateRead(roomId: $roomId)
    }

`;

export const ROOMS_QUERY = gql`
    {
        seeRooms{
            id
            unReadCount
            participants{
              id
              avatar
              username
            }
        }
        me{
            id
        }
        
    }
`;

export const SEE_ROOM = gql`
    query seeRoom($id:String!){
        seeRoom(id: $id){
            messages{
                id
                text
                createdAt
                readYn
                to{
                id
            }
                from{
                    id
                    avatar
                    username
                }
            }
        }
        me {
            username
            id
            }
    }
`;
export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId:String, $message:String!, $toId:String) {
    sendMessage(roomId: $roomId message: $message toId: $toId) {
        id
        text
        createdAt
        from{
            id
            avatar
            username
        }
        to{
                id
            }
        room{
            id
        }
    }
  }
`;
export const NEW_MESSAGE = gql`
    subscription newMessage($roomId: String!){
        newMessage(roomId: $roomId){
            id
            text
            readYn
            createdAt
            from{
                id
                avatar
                username
            }
            to{
                id
            }
            room{
                id
            }
        }
    
    }
`;