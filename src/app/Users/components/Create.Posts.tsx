import React from 'react';
import { Form, Input, Button, InputRef } from 'antd';
import moment from 'moment';
import { PostDTO } from '@/types/common.dto';
import { SinglePostImage, savePost } from '@/services/posts';

const { TextArea } = Input;

const CreatePosts = () => {
  const [form] = Form.useForm();
  const imageRef = React.useRef<InputRef>(null);

  const onSubmit = async (values: PostDTO) => {
    try {
      const file = imageRef.current?.input?.files?.[0];
      let imageUrl = '';
      if (file) {
        
        const res = await SinglePostImage(file);
        imageUrl = res; 
        console.log(res)
      }

      const { title, content, author, tags } = values;
      const newPost: PostDTO = {
        title,
        content,
        author,
        tags: typeof tags === 'string' ? tags.split(',') : tags,
        timestamp: new Date(),
        image:imageUrl,
      };

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
          rules={[{ required: true, message: 'Please input the post title!' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>
  
        <Form.Item
          label="Image"
          name="image"
        >
          <Input type="file" ref={imageRef} />
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
