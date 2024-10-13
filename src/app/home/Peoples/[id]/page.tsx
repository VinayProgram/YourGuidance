"use client"
import Posts from "@/components/personalPosts/PersonalPosts";
import { Skeleton } from "antd";
import React from "react";



const MyPublicPosts = () => {

return(
<React.Suspense fallback={<Skeleton/>}> <Posts/></React.Suspense>
)
}

export default MyPublicPosts