"use client"
import Posts from "@/components/personalPosts/PersonalPosts";
import {PostsHookPersonal} from "@/hooks/postsHook";
import { Skeleton } from "antd";
import React from "react";



const MyPersonalPosts = () => {
  const {fetchMorePosts}= PostsHookPersonal()
  React.useEffect(()=>{fetchMorePosts()},[])
return(
<React.Suspense fallback={<Skeleton/>}> <Posts/></React.Suspense>
)
}

export default MyPersonalPosts