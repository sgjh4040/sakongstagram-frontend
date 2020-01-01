import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader"
import Post from "../../Components/Post"


export default ({ loading, data }) => {
    if (loading) {
        return <Loader />
    }
    console.log(data);
    const { seeFullPost: post } = data;
    console.log(post);

    return <Post
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
}