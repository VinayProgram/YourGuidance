"use client";
import React from "react";
import {
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import { useCommonStore } from "@/store/CommonStore";
import { upsertProfile } from "@/services/profile";
import { profileDTO } from "@/types/common.dto";
const { Meta } = Card;

const Profile = () => {
  const { user } = useCommonStore();
  const handleUpsert=()=>{
    const data:profileDTO={
      displayName:user?.displayName+'',
      email:user?.email+"",
      photoURL:user?.photoURL+"",
      public:true,
      uid:user?.uid+''
    }
    upsertProfile(data)
    alert("Made profile public")
  }
  return (
    <main
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "50%",
      }}
    >
      <Card
        style={{ width: 300, height: 200 }}
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="example" src={user?.photoURL ? user?.photoURL : ""} />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <Button key={"Make profile public"} onClick={()=>handleUpsert()}>Make profile public</Button>
        ]}
      >
        <Meta
          avatar={<Avatar src={user?.photoURL ? user?.photoURL : ""} />}
          title={user?.displayName}
        />
      </Card>
    </main>
  );
};

export default Profile;
