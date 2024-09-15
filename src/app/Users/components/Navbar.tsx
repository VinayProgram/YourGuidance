"use client"
import { Avatar, Button, Flex, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useCommonStore } from "@/store/CommonStore";

const NavbarUser = () => {
  const { setSidebar, user, sidebarActive } = useCommonStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Flex justify="space-between" align="center" style={{ height: "100%" }}>
        <Button
          type="text"
          icon={sidebarActive ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setSidebar(!sidebarActive)}
        />
        <span style={{ marginRight: "20px" }}>
          <Avatar src={user?.photoURL} />
          <span style={{ marginInline: "2px" }}>{user?.displayName}</span>
        </span>
      </Flex>
    </Header>
  );
};

export default NavbarUser;
