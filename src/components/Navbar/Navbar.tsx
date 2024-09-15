"use client"
import { useCommonStore } from "@/store/CommonStore";
import { Button, Layout, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

import React from "react";

const Navbar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { sidebarActive, setSidebar } = useCommonStore();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={sidebarActive ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setSidebar(!sidebarActive)}
      />
    </Header>
  );
};

export default Navbar;
