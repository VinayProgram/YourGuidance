"use client"
import React from "react";
import HomePage from "./home/page";
import LayoutHome from "./home/layout";
const App: React.FC = () => {

  return (
    <React.Suspense>
    <LayoutHome><HomePage/></LayoutHome>
    </React.Suspense>
  );
};

export default App;
