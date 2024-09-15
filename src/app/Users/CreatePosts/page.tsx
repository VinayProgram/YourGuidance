import React from 'react'
import CreatePosts from '../components/Create.Posts'
import { Skeleton } from "antd";
const CreatePostPage = () => {
  return (
    <React.Suspense fallback={<Skeleton/>}>
      <main >
        <CreatePosts/>

        </main>
    </React.Suspense>
  )
}

export default CreatePostPage