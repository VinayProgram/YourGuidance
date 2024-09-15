import React from 'react'
import { Card } from 'antd';
import { useCommonStore } from '@/store/CommonStore';
import moment from 'moment';
import { PostDTO } from '@/types/common.dto';
import Image from 'next/image';
import parse from 'html-react-parser';
import PostsHook from '@/hooks/postsHook';
import './posts.css'
const Posts = () => {
 

  const {posts}=useCommonStore()
  const {fetchMorePosts}=PostsHook()
  const {isPostAvailable}=useCommonStore()
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    const scrollThreshold = 300; 
    const nearBottom = Math.ceil(e.currentTarget.clientHeight 
      + e.currentTarget.scrollTop) >=
      e.currentTarget.scrollHeight-scrollThreshold
    if (nearBottom && isPostAvailable ) {
      console.log('i am iun')
      // Fetch more posts if near the bottom, more posts are available, and we're not already loading
      fetchMorePosts();
    }
  };
  

  
  
  return (
    
    <div
      className='invisible-scrollbar'
      onScroll={handleScroll}

    >
       {posts.map((post:PostDTO, index:number) => (
         <>
          
            <Card
            key={index}
              title={post.title}
              bordered={true}
              style={{ width: "100%" }}
            >
              {post.image&&<Image src={post.image} height={500}  width={500} alt='image'/>}
              <p><strong>Author:</strong> {post.author}</p>
              <p><strong>Date:</strong> {moment(post.timestamp).format("MMMM Do YYYY, h:mm:ss a")}</p>
              <p><strong>Tags:</strong> {Array.isArray(post.tags)?post.tags.join(", "):post.tags}</p>
              {parse(post.content)}
            </Card>
            </>
        ))}
    </div>
 
  )
}

export default Posts