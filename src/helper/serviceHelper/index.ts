"use client"; 

import { StoreVisitorInfo } from "@/services/visitors";
import { VisitorDTO } from "@/types/common.dto";

export const RegisterVisit = async () => {
    // Sample visitor data
    if(typeof window!=undefined){
    const visitorInfo: VisitorDTO = {
      ip: await getUserIP(), // You can use an external API to get the IP
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      pageVisited: window.location.pathname,
    };
  
    // Store the visitor information
    await StoreVisitorInfo(visitorInfo);
  }
  };
  
  // Example function to retrieve IP address (you can replace this with a real API)
  const getUserIP = async (): Promise<string | null> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address: ", error);
      return null;
    }
  };
  
  // Trigger the visitor registration
 
  