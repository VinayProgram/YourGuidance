"use client"
import React from "react";

const App: React.FC = () => {
  React.useEffect(()=>{window.location.href='/home'},[])
  return (
    <React.Suspense>
    {/* <LayoutHome><HomePage/></LayoutHome> */}
    </React.Suspense>
  );
};

export default App;
