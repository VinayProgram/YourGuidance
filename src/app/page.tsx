"use client"
import React from "react";
const App: React.FC = () => {
  React.useEffect(()=>{
window.location.href='/home'
  },[])
  return (
   <React.Suspense>
    <h1>Upcomming</h1>
    </React.Suspense>
  );
};

export default App;
