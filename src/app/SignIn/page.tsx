"use client";
import React from "react";
import LoginForm from "./components/login";
import "./login.css";
import { Button, Card } from "antd";
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from "@/config";
import { LoginOutlined } from '@ant-design/icons';
// import { useRouter } from "next/navigation";
const Login = () => {
  // const router = useRouter()
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       console.log(user)
      //  router.push('/Users')
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async (e:React.MouseEvent<HTMLButtonElement>) => {
e.preventDefault()
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };
  const handleGoogleSignup = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Signup Error:', error);
      
    }
  };

  return (
    <main className="main">
      <Card title="login">
        <LoginForm />
        <span >
        <Button onClick={handleGoogleSignIn} icon={<LoginOutlined/>} >Sign In with Google</Button>
        <Button onClick={handleGoogleSignup} style={{marginLeft:'10px'}} >Sign Up with Google</Button>
        </span>
      </Card>
      
    </main>
  );
};

export default Login;
