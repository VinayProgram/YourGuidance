"use client"
import React from 'react'
import CreatePosts from '../components/Create.Posts'
import { Skeleton } from "antd";
const CreatePostPage = () => {
  return (
    <React.Suspense fallback={<Skeleton/>}>
      <main style={{backgroundColor:'white',padding:'20px'}}>
        <CreatePosts/>
        </main>
    </React.Suspense>
  )
}

export default CreatePostPage