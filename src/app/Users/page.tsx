"use client"
import Posts from "@/components/Posts/Posts";
import {PostsHook} from "@/hooks/postsHook";
import { Skeleton } from "antd";
import React from "react";


const LandingPage: React.FC = () => {
   const {fetchMorePosts}= PostsHook()
   React.useEffect(()=>{fetchMorePosts()},[])
 return(
 <React.Suspense fallback={<Skeleton/>}> <Posts/></React.Suspense>
 )
};

export default LandingPage;