import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import ModalPost from "../../Components/ModalPost"
import Button from "../../Components/Button";
import { Plus } from "../../Components/Icons";
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/core";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div`
 position:relative;
`;

const IconBox = styled.label`
  position:absolute;
    right:0;
    bottom:0;
`;
const HiddenInput = styled.input`
  display: none;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
`;


const Username = styled.span`
  width:100%;
  font-size: 26px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
  justify-content: space-around;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;
const override = css`
    position: absolute;
`;

export default ({ loading, avatarLoading, data, logOut, onImageChange }) => {
  window.scroll(0, 0);
  const [isModal, setIsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState('');


  const openModal = (id) => {
    console.log("postId", id)
    setSelectedPost(id);
    setIsModal(true);
  }
  const closeModal = () => {
    setIsModal(false);
  }

  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | sakongstagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
            <IconBox for="avatar-input">
              <Plus />
            </IconBox>
            {avatarLoading ? <FadeLoader
              css={override}
              size={35}
              color={"#999999"}
            />
              : <></>}

            <HiddenInput onChange={onImageChange} id="avatar-input" type="file" accept="image/*" />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{" "}
              {isSelf ? (
                <Button onClick={logOut} text="Log Out" />
              ) : (
                  <FollowButton isFollowing={isFollowing} id={id} />
                )}
            </UsernameRow>
            <Counts>
              <Count>
                게시물  <FatText text={String(postsCount)} />
              </Count>
              <Count>
                팔로워  <FatText text={String(followersCount)} />
              </Count>
              <Count>
                팔로우  <FatText text={String(followingCount)} />
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts >
          {posts &&
            posts.map(post => (
              <SquarePost
                openModal={openModal}
                closeModal={closeModal}
                key={post.id}
                postId={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
          {isModal
            ? (<ModalPost id={selectedPost} closeModal={closeModal} />)
            : (<></>)
          }
        </Posts>




      </Wrapper>
    );
  }
  return null;
};