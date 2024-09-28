"use client";
import React, { useEffect } from "react";
import LoginForm from "./components/login";
import "./login.css";
import { Card } from "antd";
import { useCommonStore } from "@/store/CommonStore";
import { useRouter } from "next/navigation";

const Login = () => {
  const {fetchUserProfile,user}=useCommonStore()
  const router=useRouter()
  
  useEffect(() => {
    fetchUserProfile();
    
    if (user) {
      router.push("/Users");
    }
  }, [fetchUserProfile, router, user]);
 

  return (
    <main className="main">
      <Card title="login">
        <LoginForm />
      </Card>
      
    </main>
  );
};

export default Login;
