"use client";
import Posts from "@/components/Posts/Posts";
import {PostsHook} from "@/hooks/postsHook";
import { Spin } from "antd";
import React from "react";

const HomePage = () => {
  const { fetchMorePosts } = PostsHook();
  React.useEffect(() => {
    fetchMorePosts();
  }, []);
  return <React.Suspense fallback={<Spin/>}><Posts /></React.Suspense>;
};

export default HomePage;
