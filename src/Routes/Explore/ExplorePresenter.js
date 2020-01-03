import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";
import ModalPost from "../../Components/ModalPost";


const Wrapper = styled.div`
  min-height: 50vh;
  text-align: center;
`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  justify-content: center;
  grid-gap: 25px;
  grid-template-columns: repeat(2, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
  @media (min-width: 576px){
    grid-template-columns: repeat(4, 160px);
  }
`;
const PostSection = styled(Section)`
  grid-template-columns: repeat(2, 150px);
  grid-template-rows: 150px;
  grid-auto-rows: 150px;
  @media (min-width: 768px){
    grid-template-columns: repeat(3, 250px);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;
  }
`;



const ExplorePresenter = ({ data, loading }) => {
    console.log(data);
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
        )
    }
    return (
        <Wrapper>
            <Section>
                {data && data.randomUsers.map((user, index) => (
                    <UserCard
                        key={index}
                        username={user.username}
                        isFollowing={user.isFollowing}
                        url={user.avatar}
                        isSelf={user.isSelf}
                        id={user.id}
                    />
                ))}
            </Section>
            <PostSection>
                {data.randomPosts.map((post, index) => (
                    <SquarePost
                        key={index}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount}
                        file={post.files[0]}
                        postId={post.id}
                        openModal={openModal}
                    />
                ))
                }
            </PostSection>
            {isModal
                ? (<ModalPost id={selectedPost} closeModal={closeModal} />)
                : (<></>)
            }
        </Wrapper>
    )
}

export default ExplorePresenter;