"use client";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useCommonStore } from "@/store/CommonStore";
import { addComment, getCommentsForPost } from "@/services/posts";
import { CommentDTO } from "@/types/common.dto";
import {  Button, Card, Flex, Input } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
const Comments = () => {
  const { commentsActive, postId ,user} = useCommonStore();
  const [commentData, setCommentData] = React.useState<CommentDTO[]>([]);
  const [comment,setComment]=React.useState('')
  React.useEffect(() => {
    getComments();
    setComment('')
  }, [postId]);
  const getComments = async () => {
    const commentsDatas = await getCommentsForPost(postId+'');
    console.log(commentsDatas)
    setCommentData(commentsDatas);
    setComment('')
  };

  const postComment=async()=>{
    if(!user?.uid && comment.length==0)return ''

    const commentDataProcess:CommentDTO={
      byUser:user?.uid+'',
      comment:comment,
      Postid:postId+'',
      userName:user?.displayName+''
    }
    await addComment(commentDataProcess)
    setComment('')
    getComments()
  }
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={commentsActive}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
<Flex 
  style={{
    backgroundColor: "white", 
    padding: '2px', 
    borderRadius: '5px', 
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  }} 
  gap={1}
>
  <Input 
    placeholder="Enter comment..." 
    value={comment} 
    onChange={(e) => setComment(e.currentTarget.value)}
    style={{ flex: 1, border: 'none' }}
  />
  <Button 
    icon={<PaperClipOutlined />} 
    onClick={() => postComment()} 
    style={{ backgroundColor: 'transparent', border: 'none' }}
  />
</Flex>

<Flex 
  style={{
    flexDirection: 'column', 
    padding: '10px', 
    borderRadius: '5px', 
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  }} 
  gap={3}
>
  {commentData.map((comment, index) => (
    <Card 
      key={index} 
      bordered={false} 
      size="small" 
      style={{ padding: '10px' }}
    >
      <p>{comment.comment}</p>
      <p style={{ float: 'right',fontSize:'9px',color:'gray' }} > {comment.userName}</p>
    </Card>
  ))}
</Flex>
    </Sider>
  );
};

export default Comments;
