"use client"
import {
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { MenuItemType } from "antd/es/menu/interface";
import { useRouter } from "next/navigation";
export const MenuList=()=>{
  const route=useRouter()
  const menuList:MenuItemType[]=[
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Dashboard",
      onClick:()=>route.push('/Users/CreatePosts')
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "CreatePosts",
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
    }
  ]
  return menuList
}
