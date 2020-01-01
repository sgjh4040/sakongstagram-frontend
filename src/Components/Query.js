import { gql } from "apollo-boost";

export const NOTI_QUERY = gql`
{
  seeNotification{
    id
    message
    from{
      avatar
      username
    }
    post{
      id
    }
  }
}
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id:String!){
    deleteNotification(id:$id){
      id
    }
  }
`;