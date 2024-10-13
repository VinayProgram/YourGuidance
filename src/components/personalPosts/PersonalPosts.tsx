'use client';
import React from "react";
import { Card, Divider } from "antd";
import { useCommonStore } from "@/store/CommonStore";
import moment from "moment";
import { PostDTO } from "@/types/common.dto";
import Image from "next/image";
import "../Posts/posts.css";
import { getAndDisplayPersonalPosts } from "@/services/posts";
import Link from "next/link";
import { useParams } from "next/navigation";

const Posts: React.FC = () => {
  const { user} = useCommonStore();
  const params=useParams()
  const [data,setData]=React.useState<PostDTO[]>()
  React.useEffect(()=>{getData()},[])
  const getData=async()=>{
    const postsData = await getAndDisplayPersonalPosts(user?.uid?user.uid:params.id+'');
    setData(postsData.posts)
    console.log(postsData)
  }
  
  
  const getLimitedContent = (htmlString: string) => {
    const lines = htmlString.split(/<\/?[^>]+>/).filter(Boolean);
    const limitedLines = lines.slice(0, 40).join(" ");
    return limitedLines;
  };
  return (
    <div className="invisible-scrollbar" >
      {data&&data.map((post: PostDTO) => (
        <Card
          key={post.postId} // Use unique postId as the key
          bordered={true}
          style={{ width: "100%" }}
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
