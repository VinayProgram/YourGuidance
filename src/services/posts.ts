import { db } from "@/config";
import { PostDTO } from "@/types/common.dto";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const savePost = async (post: PostDTO) => {
    try {
      const postsCollection = collection(db, "posts");
  
      // Add the post to Firestore
      const docRef = await addDoc(postsCollection, post);
      console.log("Post stored with ID: ", docRef.id);
    } catch (error) {
      console.error("Error saving post: ", error);
    }
  };



export const getAndDisplayPosts = async () => {
  try {
    const postsCollection = collection(db, "posts");
    const querySnapshot = await getDocs(postsCollection);
    const posts: PostDTO[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.title,
        content: data.content,
        author: data.author,
        timestamp: data.timestamp.toDate(), // Convert Firestore timestamp to Date
        tags: data.tags,
      };
    });
    return posts
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
};
