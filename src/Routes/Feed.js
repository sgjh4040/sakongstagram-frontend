import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { gql } from "apollo-boost";
// import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import Helmet from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { useQuery, gql } from '@apollo/client';
import {anal} from "../fbConfig"

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
  const items = 4;
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERYS, {
    variables: {
      pageNumber: 0,
      items
    }
  });
  useEffect(() => {
    refetch();
    anal.logEvent("Feed",{feed:"feed"});
  }, [])

  const onLoadMore = () => {

    fetchMore({
      variables: {
        pageNumber: data.seeFeeds.length,
        items
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log('prev', fetchMoreResult);
        if (!fetchMoreResult) {
          console.log("false")
          setHasMore(false);
          return prev;
        }
        if (fetchMoreResult.seeFeeds.length < items) {
          setHasMore(false);
        }
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

  if (loading) {
    return (
      <Wrapper>
        <Helmet>
          <title>Feed | sakongStargram</title>
        </Helmet>
        {loading && <Loader />}
      </Wrapper>
    )
  } else if (!loading && data && data.seeFeeds) {
    if (data.seeFeeds.length === 0) {
      return (
        <Wrapper>
          <Helmet>
            <title>Feed | sakongStargram</title>
          </Helmet>
        </Wrapper>
      )
    }else{
      return(
        <Wrapper>
          <Helmet>
            <title>Feed | sakongStargram</title>
          </Helmet>
          <InfiniteScroll
            dataLength={data.seeFeeds.length}
            next={onLoadMore}
            hasMore={hasMore}
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
        </Wrapper>
      )
    }
  }
};
