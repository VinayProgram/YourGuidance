'use client'
import Navbar from '@/components/Navbar/Navbar'
import Posts from '@/components/Posts/Posts'
import React from 'react'

const Home = () => {
  
  return (
    <React.Fragment>
    <Navbar/>
    <main style={{justifyContent:'center',display:'flex',width:'100%',height:'100%'}}>
    <Posts/>
    </main>
    </React.Fragment>
  )
}

export default Home