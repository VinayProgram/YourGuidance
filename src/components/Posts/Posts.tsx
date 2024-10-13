'use client';
import React from "react";
import { Card, Divider, Flex, Input, notification } from "antd";
import { useCommonStore } from "@/store/CommonStore";
import moment from "moment";
import { LikeDTO, PostDTO } from "@/types/common.dto";
import Image from "next/image";
import {PostsHook} from "@/hooks/postsHook";
import "./posts.css";
import { likePost } from "@/services/posts";
import Link from "next/link";
import { HeartOutlined, HeartFilled ,CommentOutlined} from "@ant-design/icons";
const { Search } = Input;
const Posts: React.FC = () => {
  const { posts } = useCommonStore();
  const { fetchMorePosts } = PostsHook();
  const { isPostAvailable, user,setCommentsActive,commentsActive,setPostId } = useCommonStore();
  const [likeCheck, setLikeCheck] = React.useState<string[]>([]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    e.stopPropagation();
    const scrollThreshold = 300;
    const nearBottom =
      Math.ceil(e.currentTarget.clientHeight + e.currentTarget.scrollTop) >=
      e.currentTarget.scrollHeight - scrollThreshold;

    if (nearBottom && isPostAvailable) {
      fetchMorePosts();
    }
  };
  const openNotification = (message:string,description:string) => {
    notification.open({
      message: message,
      description: description,
    });
  };
  
  const handleLikes = async (post: PostDTO) => {
    if(!user?.uid)return openNotification('Login Required',"Please login to like or comment")
    if (likeCheck.includes(post.postId + "")) return false;
    const objLikeData: LikeDTO = {
      authorId: post.authorId,
      byUser: user?.uid + "",
      liked: true,
      Postid: post.postId + "",
      shared: "false",
    };
    likePost(objLikeData);
    setLikeCheck((prev) => [...prev, post.postId + ""]);
  };

  const getLimitedContent = (htmlString: string) => {
    const lines = htmlString.split(/<\/?[^>]+>/).filter(Boolean);
    const limitedLines = lines.slice(0, 40).join(" ");
    return limitedLines;
  };
  return (
    <div className="invisible-scrollbar" onScroll={(e) => handleScroll(e)}>
       <Search
        placeholder="Search by display posts"
        enterButton="Search"
        size="large"
        onSearch={()=>""}
        style={{ marginBottom: "20px" }}
      />
      {posts.map((post: PostDTO) => (
        <Card
          key={post.postId} // Use unique postId as the key
          bordered={true}
          style={{ width: "100%" }}
          onDoubleClick={() => handleLikes(post)}
        >
          {post.image && (
            <Image src={post.image} height={500} width={500} alt="image" />
          )}
          <p>
            <strong>Author:</strong> {post.author}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {moment(post.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <p>
            <strong>Tags:</strong>{" "}
            {Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}
          </p>
          <Flex gap={7} style={{marginTop:'2px'}}>
            {likeCheck.includes(post.postId + "") ? (
              <HeartFilled style={{ color: "red" }} label={post?.likes+''}/>
            ) : (
              <HeartOutlined onClick={() => handleLikes(post)} label={post?.likes+''}/>
            )}
            {post?.likes+''}
              <CommentOutlined onClick={()=>{setCommentsActive(!commentsActive); setPostId(post.postId+'')}}/>
            
          </Flex>
          <Divider />
          <div
            dangerouslySetInnerHTML={{
              __html: getLimitedContent(post.content),
            }}
            style={{ fontWeight: "bold" }}
          />
          <Link
            style={{ textAlign: "center", width: "100%", display: "block" }}
            href={"/home/" + post.id}
          >
            Read more
          </Link>
        </Card>
      ))}
    </div>
  );
};

// Use React.memo to optimize the rendering
export default React.memo(Posts);
