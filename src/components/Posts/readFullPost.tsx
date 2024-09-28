'use client'
import { getPostById } from '@/services/posts'
import { PostDTO } from '@/types/common.dto'
import { Card, Spin } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser'
const ReadFullPost = ({id}:{id:string}) => {
  const [postData,setPostData]=React.useState<PostDTO>()
  React.useEffect(()=>{getPost() },[id])
  const getPost=async()=>{
     const data= await getPostById(id)
     if(data){
      setPostData(data)
     }
  }
  return (
    <React.Suspense fallback={<Spin/>}>
       <Card
              title={postData?.title}
              bordered={true}
              style={{ width: "100%" ,margin:'1rem'}}
              onDoubleClick={()=>alert('likeds')}
            >
              {postData?.image && (
                <Image src={postData?.image} height={500} width={500} alt="image" />
              )}
              <p>
                <strong>Author:</strong> {postData?.author}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {moment(postData?.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {Array.isArray(postData?.tags) ? postData?.tags.join(", ") : postData?.tags}
              </p>
              {postData?.content&&parse(postData?.content)}
            </Card>
    </React.Suspense>
  )
}

export default ReadFullPost