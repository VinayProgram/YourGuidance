import React from 'react'
import { Layout } from "antd";
import SideBar from "@/components/Navbar/SideBar";
import Navbar from "@/components/Navbar/Navbar";

const LayoutHome = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
   
  return (
    <>
     <Layout style={{ height: "100vh" }}>
      <SideBar />
      <Layout>
        <Navbar />
        {children}
      </Layout>
    </Layout>
    </>
  )
}

export default LayoutHome