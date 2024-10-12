"use client"
import React from "react";
import type { FormProps } from "antd";
import { Button,  Form, } from "antd";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config";
import { GoogleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/Users");
              window.location.href='/Users'
    }
  });

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      if(result){
        window.location.href='/Users'
        router.push("/Users");
        document.cookie = `token=${token}; path=/;`;
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <Button  onClick={handleGoogleSignIn} icon={<GoogleOutlined />}>
          SignIn / Signup with Google 
        </Button>
    </Form>
  );
};

export default LoginForm;
