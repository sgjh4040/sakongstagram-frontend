import React, {useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import Helmet from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

export const FEED_QUERYS = gql`
  query seeFeeds($pageNumber: Int!, $items: Int!){
    seeFeeds(pageNumber: $pageNumber, items: $items){
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }

`;
export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;
const Wrapper = styled.div`
  display: block;
  
  min-height: 80vh;
`;
const override = css`
display: block;
margin: 0 auto;
`;
export default () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const items = 2;
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERYS, {
    variables: {
      pageNumber:0,
      items:2
    }
  });

  const onLoadMore = () => {

    fetchMore({
      variables: {
        pageNumber: data.seeFeeds.length,
        items
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeFeeds: [...prev.seeFeeds, ...fetchMoreResult.seeFeeds]
        });
      }
    })

  }
  const handleScroll = ({ currentTarget }) => {
    console.log("onLoadMore")
    console.log(currentTarget.scrollTop)
    console.log(currentTarget.clientHeight)
    console.log(currentTarget.scrollHeight)
    if (
      currentTarget.scrollTop + currentTarget.clientHeight >=
      currentTarget.scrollHeight
    ) {
      console.log("onload")
      onLoadMore();
    }
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | sakongStargram</title>
      </Helmet>

      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeeds && (
          <InfiniteScroll
            dataLength={data.seeFeeds.length}
            next={onLoadMore}
            hasMore={true}
            loader={<ClipLoader
                      css={override}
                      size={35}
                      color={"#999999"}
            />}
          >
            {data.seeFeeds.map(post => (
              <Post
                key={post.id}
                id={post.id}
                location={post.location}
                caption={post.caption}
                user={post.user}
                files={post.files}
                likeCount={post.likeCount}
                isLiked={post.isLiked}
                comments={post.comments}
                createdAt={post.createdAt}
              />
            ))}
          </InfiniteScroll>
        )}

    </Wrapper>
  );
};
