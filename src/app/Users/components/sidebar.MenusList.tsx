"use client"
import {
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MenuItemType } from "antd/es/menu/interface";
import { useRouter } from "next/navigation";
export const MenuList=()=>{
  const route=useRouter()
  const menuList:MenuItemType[]=[
    {
      key: "31",
      icon: <HomeOutlined />,
      label: "Home",
      onClick:()=>route.push('/Users')
    },
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Profile",
      onClick:()=>route.push('/Users/Profile')
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "CreatePosts",
      onClick:()=>route.push('/Users/CreatePosts')
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
    }
  ]
  return menuList
}
