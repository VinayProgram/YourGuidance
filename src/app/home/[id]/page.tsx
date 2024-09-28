'use client'
import ReadFullPost from '@/components/Posts/readFullPost'
import { Spin } from 'antd'
import { useParams } from 'next/navigation'
import React from 'react'

const FullPagePost = () => {
    const id=useParams()

return (
    <React.Suspense fallback={<Spin size="small" />}>
        
   {id.id && <ReadFullPost id={id.id+''}/>}
   </React.Suspense>
  )
}

export default FullPagePost