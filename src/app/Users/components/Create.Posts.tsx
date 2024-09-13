import React from 'react';
import { Form, Input, Button, Tag } from 'antd';
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods
import moment from 'moment';
import { db } from '@/config';
import { PostDTO } from '@/types/common.dto';

const { TextArea } = Input;

const CreatePosts = () => {
  const [form] = Form.useForm();
  
  // Method to submit post to Firestore
  const onSubmit = async (values: PostDTO) => {
    try {
      const { title, content, author, tags} = values;
      const newPost = {
        title,
        content,
        author,
        tags: typeof tags =='string'?tags.split(','):tags, // Convert comma-separated string to array
        timestamp: new Date(),
      };

      // Insert post into Firestore
      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Document written with ID: ", docRef.id);
      form.resetFields(); // Reset the form after submission
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
          rules={[{ required: true, message: 'Please input the post title!' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input the post content!' }]}
        >
          <TextArea rows={4} placeholder="Enter post content" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: 'Please input the author!' }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: 'Please input tags (comma separated)!' }]}
        >
          <Input placeholder="Enter tags, separated by commas" />
        </Form.Item>
        <Tag />


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
