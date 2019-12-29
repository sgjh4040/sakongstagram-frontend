import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import FatText from "./FatText";
// import PropTypes from "prop-types";
import { SEE_FULL_POST } from "./Post/PostQueries"
import { Element} from 'react-scroll';
import { useQuery } from "react-apollo-hooks";
import {Close} from "./Icons"


const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #7D7D7D;
  z-index:10;
`;
const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
`;
const PostImage = styled.div`
    background-image: url(${props => props.bg});
    background-size: cover;
    cursor: pointer;
    width: 600px;
    height: 600px;
`;
const CommentContainer = styled.div`
    width: 300px;
`;

const FlexRow = styled.div`
    display:flex;
    flex-direction:row;
`;
const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #EFEFEF;
`;
const Comments = styled.div`
    margin-top: 10px;
`;
const CommentBox = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    padding: 0 15px 15px;
`;
const Text = styled.div`
    flex:1;
`;
const CloseIcon = styled.span`
    position: absolute;
    cursor: pointer;
    right:0;
    top:0;
    fill:#FFFFFF;

`;

export default ({
    id,
    closeModal
}) => {
    const { data, loading } = useQuery(SEE_FULL_POST, { variables: { id } });
    console.log(data);

    if (!loading && data && data.seeFullPost) {
        return (
            <ModalContainer>
                <CloseIcon onClick={closeModal} >
                    <Close/>
                </CloseIcon>
                <Modal>
                    <FlexRow>
                        <PostImage bg={data.seeFullPost.files[0].url} />
                        <CommentContainer>
                            <Header>
                                <Avatar size="sm" url={data.seeFullPost.user.avatar} />
                                <FatText text={data.seeFullPost.user.username} />
                                <Text>{data.seeFullPost.text}</Text>
                            </Header>

                            <Comments>
                                <Element style={{ overflow: 'scroll', height: "480px" }}>
                                    {data.seeFullPost.comments.map(comment => (
                                        <CommentBox key={comment.id}>
                                            <Avatar size="sm" url={comment.user.avatar} />
                                            <FatText text={comment.user.username} />
                                            <Text>{comment.text}</Text>
                                        </CommentBox>
                                    ))}
                                </Element>
                            </Comments>

                        </CommentContainer>
                    </FlexRow>

                </Modal>
            </ModalContainer>
        )

    } else {
        return <></>
    }



}