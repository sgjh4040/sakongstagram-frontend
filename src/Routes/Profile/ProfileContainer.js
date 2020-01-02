import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import axios from "axios";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";




export const GET_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
export const EDIT_AVATAR = gql`
    mutation editUser($avatar:String){
        editUser(avatar:$avatar){
            id
        }
    }
`;



export default withRouter(({ match: { params: { id } } }) => {
  const { data, loading, refetch } = useQuery(GET_USER, { variables: { id } });
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [uploadAvaterMutaion] = useMutation(EDIT_AVATAR,{
    refetchQueries: () => [{
      query: GET_USER,
      variables:{
        id
      }
    }]
  });
  const [logOut] = useMutation(LOG_OUT);

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        setAvatarLoading(true);
        const {
          data: location
        } = await axios.post("http://localhost:4000/api/uploads", formData, {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }
        });
        const {
          data: { editUser }
        } = await uploadAvaterMutaion({
          variables: {
            avatar: location[0]
          }
        });
        if (editUser.id) {

        }
      } catch(e){

      }finally{
        setAvatarLoading(false);
      }
    }
  }



  useEffect(() => {
    refetch();
  }, [])

  return <ProfilePresenter loading={loading} avatarLoading={avatarLoading} logOut={logOut} onImageChange={onImageChange} data={data} />;
});
