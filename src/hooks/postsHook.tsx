"use client"
import { POSTS_LIMIT, getAndDisplayPosts } from "@/services/posts";
import { useCommonStore } from "@/store/CommonStore";


const PostsHook = () => {
   
  const { setPosts,posts,loader,setLoader,setIsPostAvailable,lastVisible,setLastVisible } = useCommonStore();
    const fetchMorePosts = async () => {
        if (loader.visibile) return; 
        setLoader('visibile',true)
        const postsData = await getAndDisplayPosts(lastVisible);
        if (postsData?.posts&&postsData?.posts.length < POSTS_LIMIT) {
          setIsPostAvailable(false); 
        }
        const postDatacheck=postsData?.posts?postsData?.posts:[]
        setPosts( [...posts,...postDatacheck]);
        if(postsData?.lastVisibleDoc)setLastVisible(postsData?.lastVisibleDoc)
        
        setLoader('visibile',false)
      };
      return {fetchMorePosts}
}

export default PostsHook