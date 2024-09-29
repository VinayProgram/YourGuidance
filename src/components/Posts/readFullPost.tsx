import { PostDTO } from "@/types/common.dto";
import { Card, Spin } from "antd";
import moment from "moment";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/config";
 const getPostByIdLocal = async (postId: string) => {
  try {
    const postRefQuery = query(
      collection(db, "posts"),
      where('id', '==', postId),
      limit(1)
    );

    // Fetch the documents
    const postSnap = await getDocs(postRefQuery);

    // Check if the document exists
    if (!postSnap.empty) {
      // Get the first document from the snapshot
      const doc = postSnap.docs[0];
      const data = doc.data();

      return {
        id: doc.id, // Using the document ID from Firestore
        title: data.title,
        content: data.content,
        author: data.author,
        timestamp: data.timestamp.toDate(),
        tags: data.tags,
        image: data.image,
        likes: data.likes,
        authorId:data.authorId
      };
    } else {
      console.log("No such post!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching post: ", error);
    throw error;
  }
};

const ReadFullPost = async ({ id }: { id: string }) => {
  const postData: PostDTO | null = await getPostByIdLocal(id);
  if (!postData) return "no data found";
  return (
    <React.Suspense fallback={<Spin />}>
      <Card
        title={postData?.title}
        bordered={true}
        style={{ width: "100%" }}
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
          {Array.isArray(postData?.tags)
            ? postData?.tags.join(", ")
            : postData?.tags}
        </p>
        {postData?.content && parse(postData?.content)}
      </Card>
    </React.Suspense>
  );
};

export default ReadFullPost;
