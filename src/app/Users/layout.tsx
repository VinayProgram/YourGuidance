"use client";
import React, { useEffect } from "react";
import { Layout, Skeleton } from "antd";
import { useCommonStore } from "@/store/CommonStore";
import SideBarUser from "./components/SideBar";
import NavbarUser from "./components/Navbar";
import Comments from "@/components/Posts/comments";
const LayoutHead = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { fetchUserProfile } = useCommonStore();
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <React.Suspense fallback={<Skeleton />}>
      <Layout style={{ height: "100vh" }}>
        <SideBarUser />
        <Layout>
          <NavbarUser />

          {children}
        </Layout>
        <Comments/>
      </Layout>
    </React.Suspense>
  );
};

export default LayoutHead;
