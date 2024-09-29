/* eslint-disable @typescript-eslint/no-explicit-any */
import ReadFullPost from "@/components/Posts/readFullPost";
import { Spin } from "antd";
import React from "react";

const FullPagePost = (context: { params: any; }) => {
  const  id  = context.params
  return (
    <React.Suspense fallback={<Spin size="small" />}>
      {id?.id && <ReadFullPost id={id.id+''} />}
    </React.Suspense>
  );
};

export default FullPagePost;
