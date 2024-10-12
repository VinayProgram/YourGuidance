"use client";
import React from "react";
import LoginForm from "./components/login";
import "./login.css";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config";

const Login = () => {
  const router=useRouter()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/Users");
    }
  });


  return (
    <main className="main" >
      <Card title="login">
        <LoginForm />
      </Card>
      
    </main>
  );
};

export default Login;
