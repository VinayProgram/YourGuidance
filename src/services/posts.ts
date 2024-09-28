"use client";
import { db, storage } from "@/config";
import { CommentDTO, LikeDTO, PostDTO } from "@/types/common.dto";
import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
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
    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        postId:doc.id,
        id: data.id,
        title: data.title,        
        content: data.content,
        author: data.author,
        timestamp: data.timestamp.toDate(),
        tags: data.tags,
        image: data.image,
        likes:data.likes,
        authorId:data.authorId
      };
    });

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { posts, lastVisibleDoc };
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
};



export const getPostById = async (postId: string) => {
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

export const likePost = async (likeDTO: LikeDTO) => {
  const { liked, byUser, Postid, authorId } = likeDTO;

  try {
    const likeRef = doc(db, `posts/${Postid}/likes/${byUser}`);

    if (liked) {
      // Add like
      await setDoc(likeRef, {
        byUser,
        Postid,
        authorId,
        liked: true
      });
      console.log(`Post ${Postid} liked by user ${byUser}`);
    } else {
      // Remove like
      console.log(`Like removed for post ${Postid} by user ${byUser}`);
    }
  } catch (error) {
    console.error("Error liking post: ", error);
    throw error;
  }
};


export const getLikesForPost = async (postId: string) => {
  try {
    const likesQuery = query(collection(db, `posts/${postId}/likes`));
    const querySnapshot = await getDocs(likesQuery);

    const likes = querySnapshot.docs.map(doc => doc.data());
    return likes;
  } catch (error) {
    console.error("Error fetching likes: ", error);
    throw error;
  }
};


export const addComment = async (commentDTO: CommentDTO) => {
  const { comment, byUser, Postid, authorId } = commentDTO;

  try {
    const newCommentRef = doc(collection(db, `posts/${Postid}/comments`));
    await setDoc(newCommentRef, {
      comment,
      Commentlikes: 0,
      byUser,
      Postid,
      authorId
    });
    console.log(`Comment added by ${byUser} on post ${Postid}`);
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw error;
  }
};

export const getCommentsForPost = async (postId: string) => {
  try {
    const commentsQuery = query(collection(db, `posts/${postId}/comments`));
    const querySnapshot = await getDocs(commentsQuery);

    const comments = querySnapshot.docs.map(doc => doc.data());
    return comments;
  } catch (error) {
    console.error("Error fetching comments: ", error);
    throw error;
  }
};


export const getLikeCountForPost = async (postId: string) => {
  try {
    // Reference to the 'likes' subcollection of the specific post
    const likesCollection = collection(db, `posts/${postId}/likes`);
    
    // Create a query and count the documents in the collection
    const likesQuery = query(likesCollection);
    const aggregateSnapshot = await getCountFromServer(likesQuery);
    console.log(aggregateSnapshot.data())
    // Return the count of documents (likes)
    return aggregateSnapshot.data().count;
  } catch (error) {
    console.error("Error fetching like count: ", error);
    throw error;
  }
};
