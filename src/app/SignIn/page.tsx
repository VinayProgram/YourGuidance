"use client";
import React from "react";
import LoginForm from "./components/login";
import "./login.css";
import { Card } from "antd";

const Login = () => {
  // const router = useRouter()
 

  return (
    <main className="main">
      <Card title="login">
        <LoginForm />
      </Card>
      
    </main>
  );
};

export default Login;
