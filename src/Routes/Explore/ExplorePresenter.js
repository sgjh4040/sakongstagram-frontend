import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 50vh;
  text-align: center;
`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  justify-content: center;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;
const PostSection = styled(Section)`
  grid-template-columns: repeat(1, 400px);
  grid-template-rows: 400px;
  grid-auto-rows: 400px;
  @media (min-width: 768px){
    grid-template-columns: repeat(3, 250px);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;
  }
`;


const ExplorePresenter = ({ data, loading }) => {
    console.log(data);

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
                {data.randomUsers.map((user, index) => (
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
                    />
                ))
                }
            </PostSection>
        </Wrapper>
    )
}

export default ExplorePresenter;