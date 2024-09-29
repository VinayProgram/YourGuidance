'use client';
import React from "react";
import { Card, Divider, Flex } from "antd";
import { useCommonStore } from "@/store/CommonStore";
import moment from "moment";
import { LikeDTO, PostDTO } from "@/types/common.dto";
import Image from "next/image";
import PostsHook from "@/hooks/postsHook";
import "./posts.css";
import { likePost } from "@/services/posts";
import Link from "next/link";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Posts: React.FC = () => {
  const { posts } = useCommonStore();
  const { fetchMorePosts } = PostsHook();
  const { isPostAvailable, user } = useCommonStore();
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

  const handleLikes = async (post: PostDTO) => {
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
          <Flex>
            {likeCheck.includes(post.postId + "") ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined onClick={() => handleLikes(post)} />
            )}
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
