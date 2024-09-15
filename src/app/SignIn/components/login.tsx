"use client"
import React from "react";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config";
import { LoginOutlined } from "@ant-design/icons";
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
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/Users");
      }
    });
    return () => unsubscribe();
  }, [token]);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (typeof window !== "undefined") {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setToken(token);
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
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Flex justify="space-around">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={handleGoogleSignIn} icon={<LoginOutlined />}>
          Sign In with Google
        </Button>
      </Flex>
    </Form>
  );
};

export default LoginForm;
