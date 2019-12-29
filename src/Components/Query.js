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