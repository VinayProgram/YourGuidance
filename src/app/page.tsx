"use client";
import React from "react";
import { Layout } from "antd";
import SideBar from "@/components/Navbar/SideBar";
import Navbar from "@/components/Navbar/Navbar";
import Posts from "@/components/Posts/Posts";
import { RegisterVisit } from "@/helper/serviceHelper";
import { getAndDisplayPosts } from "@/services/posts";
import { useCommonStore } from "@/store/CommonStore";


const App: React.FC = () => {
  const {setPosts}=useCommonStore()
  React.useEffect(()=>{RegisterVisit(),getPosts()},[])
  const getPosts=async()=>{
    const posts=await getAndDisplayPosts();
    posts&&setPosts(posts)
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <SideBar />
      <Layout>
        <Navbar />
        <Posts />
      </Layout>
    </Layout>
  );
};

export default App;
