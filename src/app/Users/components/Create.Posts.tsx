"use client";
import React from "react";
import { Form, Input, Button, InputRef } from "antd";
import moment from "moment";
import { PostDTO } from "@/types/common.dto";
import { SinglePostImage, savePost } from "@/services/posts";
import { useCommonStore } from "@/store/CommonStore";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePosts = () => {
  const [form] = Form.useForm();
  const imageRef = React.useRef<InputRef>(null);
  const { user } = useCommonStore();

  const onSubmit = async (values: PostDTO) => {
    try {
      const file = imageRef.current?.input?.files?.[0];
      let imageUrl = "";
      if (file) {
        const res = await SinglePostImage(file);
        imageUrl = res;
      }

      const { title, content, tags } = values;
      const stringtags=tags+''
      const newPost: PostDTO = {
        id:crypto.randomUUID(),
        title,
        content,
        author: user?.displayName ? user?.displayName : "",
        tags: typeof tags === "string" ? stringtags?.split(",") : tags,
        timestamp: new Date(),
        image: imageUrl,
        likes:0,
        authorId:user?.uid+''
      };
      console.log(newPost);
      // Save the post
      await savePost(newPost);

      // Reset form fields
      form.resetFields();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ timestamp: moment() }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the post title!" }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Input type="file" ref={imageRef} />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            { required: true, message: "Please input the post content!" },
          ]}
        >
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: [
                "image",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "link",
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                
              ],
            }}
          />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
          rules={[
            { required: true, message: "Please input tags (comma separated)!" },
          ]}
        >
          <Input placeholder="Enter tags, separated by commas" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePosts;
