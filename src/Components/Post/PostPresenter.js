import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";
import { getFormattedRegDate } from "../../Util"

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 300px;
  user-select: none;
  margin: 0 auto 30px;
  a {
    color: inherit;
  }
  @media (min-width: 576px){
    max-width: 500px;
  }
  @media (min-width: 768px){
    /* max-width: 600px; */
    max-width: 600px;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.img`
  image-orientation: none;
  max-width: 100%;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src}});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
  @media (min-width: 576px){
    height: 500px;
  }
  @media (min-width: 768px){
    /* max-width: 600px; */
    height: 600px;
  }
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;
const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 80%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;
const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;
const Caption = styled.div`
  margin: 10px 0px;
`;


export default ({
  user: { username, avatar, id },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption,
  loading
}) => (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <Link to={`/${id}`}>
            <FatText text={username} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files && files.map((file, index) => (
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        <Caption>
          <FatText text={username} /> {caption}
        </Caption>
        {comments && (
          <Comments>
            {comments.map(comment => (
              <Comment key={comment.id}>
                <Link to={`/${comment.user.id}`}>
                  <FatText text={comment.user.username} />
                </Link>
                {comment.text}
              </Comment>
            ))}
            {selfComments.map(comment => (
              <Comment key={comment.id}>
                <Link to={`/${comment.user.id}`}>
                  <FatText text={comment.user.username} />
                </Link>
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}
        <Timestamp>{getFormattedRegDate(createdAt)}</Timestamp>
        <Textarea
          placeholder={loading ? "댓글이 달리고있어요!" : "댓글을 달아주세요..."}
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyPress={onKeyPress}
          disabled={loading}
        />
      </Meta>
    </Post>
  );