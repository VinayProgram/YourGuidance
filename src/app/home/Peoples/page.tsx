"use client";
import React, { useEffect, useState } from "react";
import { Input, List, Typography, Spin, Avatar, Button } from "antd";
import { getProfiles } from "@/services/profile";
import { profileDTO } from "@/types/common.dto";
import { useRouter } from "next/navigation";

const { Search } = Input;
const { Title } = Typography;

const Peoples = () => {
  const [profiles, setProfiles] = useState<profileDTO[]>();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const route=useRouter()

  // Function to fetch profiles based on search query
  const fetchProfiles = async () => {
    setLoading(true);
    const result = await getProfiles(searchQuery);
    setProfiles(result);
    setLoading(false);
  };

  // Fetch all profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, [searchQuery]);

  // Handle search input
  const onSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>People Profiles</Title>
      <Search
        placeholder="Search by display name"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: "20px" }}
      />
      {loading ? (
        <Spin />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={profiles}
          renderItem={(profile) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={profile.photoURL}></Avatar>}
                title={
                  <a href={`/profile/${profile.id}`}>{profile.displayName}</a>
                }
                description={`Email: ${profile.email}`}
              />
              <Button onClick={()=>route.push("Peoples/"+profile.uid)}>Visit</Button>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Peoples;
