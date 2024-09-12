"use client";
import React from "react";
import LoginForm from "./components/login";
import "./login.css";
import { Button, Card } from "antd";
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from "@/config";
const Login = () => {
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       console.log(user)
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };
  const handleGoogleSignup = async () => {
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
        <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
        <Button onClick={handleGoogleSignup}>Sign Up with Google</Button>
      </Card>
      
    </main>
  );
};

export default Login;
