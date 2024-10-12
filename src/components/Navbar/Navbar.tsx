"use client"
import { useCommonStore } from "@/store/CommonStore";
import { Button, Flex, Layout } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

import React from "react";

const Navbar = () => {
  const { sidebarActive, setSidebar } = useCommonStore();
  return (
    <Header style={{ padding: 0, background: "#001529",color:"white" }}>
  <Flex justify="space-between" align="center" gap={2} >
      <Button
        type="text"
        icon={sidebarActive ? <MenuUnfoldOutlined color="white" style={{color:"white"}}/> : <MenuFoldOutlined  style={{color:"white"}} color="white"/>}
        onClick={() => setSidebar(!sidebarActive)}
      />
          <h1 style={{color:'white'}}><b>Your</b>-<i style={{color:'yellow'}}>Guidance</i></h1>
          </Flex>
    </Header>
  );
};

export default Navbar;
