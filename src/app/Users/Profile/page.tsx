'use client'
import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useCommonStore } from '@/store/CommonStore';
const { Meta } = Card;

const Profile = () => {
  const {  user } = useCommonStore();
  return (
    <main style={{width:'100%',justifyContent:'center',display:'flex'}}>
  <Card
    style={{ width: 300 }}
    cover={
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt="example"
        src={user?.photoURL?user?.photoURL:""}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar   src={user?.photoURL?user?.photoURL:""} />}
      title={user?.displayName}
      description="This is the description"
    />
  </Card>
    </main>
  )
}

export default Profile