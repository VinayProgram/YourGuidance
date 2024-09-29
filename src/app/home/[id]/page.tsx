import ReadFullPost from "@/components/Posts/readFullPost";
import { Spin } from "antd";
import { GetServerSidePropsContext } from "next";
import React from "react";

const FullPagePost = (context: GetServerSidePropsContext) => {
  const { id } = context.params as { id: string };
  return (
    <React.Suspense fallback={<Spin size="small" />}>
      {id && <ReadFullPost id={id + ""} />}
    </React.Suspense>
  );
};

export default FullPagePost;
