'use client'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { useCommonStore } from '@/store/CommonStore';
import { MenuList } from './sidebar.MenusList';

const SideBarUser = () => {
  const {sidebarActive}=useCommonStore()
  return (
    <Sider trigger={null} collapsible collapsed={sidebarActive}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={MenuList()}
        />
      </Sider>
  )
}

export default SideBarUser