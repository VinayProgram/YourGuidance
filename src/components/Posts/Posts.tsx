import React from 'react'
import { Content } from 'antd/es/layout/layout'
import { Card, theme } from 'antd';
import { useCommonStore } from '@/store/CommonStore';
import moment from 'moment';
import { PostDTO } from '@/types/common.dto';

const Posts = () => {
  const {
    token: { colorBgContainer,borderRadiusLG },
  } = theme.useToken();
  const {posts}=useCommonStore()
  
  return (
    <Content style={{ margin: '24px 16px 0' }}>
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
       {posts.map((post:PostDTO, index:number) => (
         <>
            <Card
            key={index}
              title={post.title}
              bordered={true}
              style={{ width: "100%" }}
            >
              <p><strong>Author:</strong> {post.author}</p>
              <p><strong>Date:</strong> {moment(post.timestamp).format("MMMM Do YYYY, h:mm:ss a")}</p>
              <p><strong>Tags:</strong> {post.tags.join(", ")}</p>
              <p>{post.content}</p>
            </Card>
            </>
        ))}
    </div>
  </Content>
  )
}

export default Posts