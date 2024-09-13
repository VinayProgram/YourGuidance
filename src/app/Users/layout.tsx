"use client";
import React, { useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Layout, Menu, theme } from "antd";
import { useCommonStore } from "@/store/CommonStore";

const { Header, Sider, Content } = Layout;
const LayoutHead = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user, fetchUserProfile } = useCommonStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "fit-content" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex
            justify="space-between"
            align="center"
            style={{ height: "100%" }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <span style={{marginRight:'20px'}}>
              <Avatar src={user?.photoURL} />
              <text style={{marginInline:'2px'}}>{user?.displayName}</text>
            </span>
          </Flex>
        </Header>
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
  );
};

export default LayoutHead;
