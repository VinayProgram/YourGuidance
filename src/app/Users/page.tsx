"use client"

import Posts from "@/components/Posts/Posts";
import PostsHook from "@/hooks/postsHook";
import React from "react";


const LandingPage: React.FC = () => {
   const {fetchMorePosts}= PostsHook()
   React.useEffect(()=>{fetchMorePosts()},[])
 return(
  <Posts/>
 )
};

export default LandingPage;