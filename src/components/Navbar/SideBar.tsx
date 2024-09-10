import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react'
import {
   
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { useCommonStore } from '@/store/CommonStore';
const SideBar = () => {
  const {sidebarActive}=useCommonStore()
  return (
    <Sider
    trigger={null} collapsible collapsed={sidebarActive}
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
  >
    <div className="demo-logo-vertical" />
    <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
  </Sider>
  )
}

export default SideBar