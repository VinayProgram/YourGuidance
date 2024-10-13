'use client'
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react'
import {
    LikeFilled,
    GroupOutlined,
    UserOutlined,
    HomeOutlined,
  } from '@ant-design/icons';
import { useCommonStore } from '@/store/CommonStore';
import { useRouter } from 'next/navigation';
const SideBar = () => {
  const {sidebarActive}=useCommonStore()
  const route=useRouter()
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
              key: 'logo',
              icon: <h1 style={{color:'white'}}><b>Your</b>-<i style={{color:'yellow'}}>Guidance</i></h1>,
              onClick:()=>route.push('/home')
            },
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'home',
              onClick:()=>route.push('/home')
            },
            {
              key: '10',
              icon: <UserOutlined />,
              label: 'SignIn',
              onClick:()=>route.push('/SignIn')
            },
            {
              key: '2',
              icon: <GroupOutlined/>,
              label: 'Peoples',
              onClick:()=>route.push('/home/Peoples')
            },
            {
              key: '3',
              icon: <LikeFilled/>,
              label: 'Most Liked Posts',
            },
          ]}
        />
  </Sider>
  )
}

export default SideBar