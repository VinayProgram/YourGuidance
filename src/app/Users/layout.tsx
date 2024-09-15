"use client";
import React, { useEffect } from "react";
import { Layout, Skeleton, theme } from "antd";
import { useCommonStore } from "@/store/CommonStore";
import SideBarUser from "./components/SideBar";
import NavbarUser from "./components/Navbar";
const { Content } = Layout;
const LayoutHead = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {  fetchUserProfile } = useCommonStore();
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <React.Suspense fallback={<Skeleton/>}>
    <Layout style={{ height: "fit-content" }}>
      <SideBarUser/>
      <Layout>
        <NavbarUser/> 
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height:'100%',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
    </React.Suspense>
  );
};

export default LayoutHead;
