'use client'
import { db, storage } from "@/config";
import { PostDTO } from "@/types/common.dto";
import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const savePost = async (post: PostDTO) => {
  try {
    const postsCollection = collection(db, "posts");
    const docRef = await addDoc(postsCollection, post);
    console.log("Post stored with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving post: ", error);
  }
};

export const SinglePostImage = (image: File | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (image) {
      const storageRef = ref(storage, `posts/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    } else {
      reject(new Error("No image provided"));
    }
  });
};

export const POSTS_LIMIT = 20; // Number of posts to fetch per batch

export const getAndDisplayPosts = async (
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData> | null
) => {
  try {
    let postsQuery;
    if (lastVisible) {
      postsQuery = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"), // Order posts by timestamp
        startAfter(lastVisible), // Start after the last document from the previous batch
        limit(POSTS_LIMIT) // Limit number of posts to fetch
      );
    } else {
      postsQuery = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        limit(POSTS_LIMIT)
      );
    }

    const querySnapshot = await getDocs(postsQuery);
    const posts: PostDTO[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.title,
        content: data.content,
        author: data.author,
        timestamp: data.timestamp.toDate(),
        tags: data.tags,
        image: data.image,
      };
    });

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { posts, lastVisibleDoc };
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
};
