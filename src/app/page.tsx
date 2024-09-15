"use client";
import React from "react";
import { Layout } from "antd";
import SideBar from "@/components/Navbar/SideBar";
import Navbar from "@/components/Navbar/Navbar";
import Posts from "@/components/Posts/Posts";
import PostsHook from "@/hooks/postsHook";

const App: React.FC = () => {
  const {fetchMorePosts}=PostsHook() 
  React.useEffect(()=>{
    fetchMorePosts()
   },[])
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
