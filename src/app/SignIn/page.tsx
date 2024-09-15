"use client";
import React, { useEffect } from "react";
import LoginForm from "./components/login";
import "./login.css";
import { Card } from "antd";
import { useCommonStore } from "@/store/CommonStore";

const Login = () => {
  const {fetchUserProfile}=useCommonStore()

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);
 

  return (
    <main className="main">
      <Card title="login">
        <LoginForm />
      
      </Card>
      
    </main>
  );
};

export default Login;
