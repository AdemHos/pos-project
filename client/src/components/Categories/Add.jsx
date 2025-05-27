import React from "react";
import { Input, Modal, Button, Form ,message } from "antd";

const Add = ({ isAddModalOpen, setIsAddModalOpen,categories,setCategories }) => {
    const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori Eklendi");
      form.resetFields();
      setCategories([...categories, {
        _id: Math.random(),
        title: values.title
      }]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Kategori Ekle"
          rules={[
            {
              required: true,
              message: "Kategori Alanı Boş Bırakılamaz",
            },
          ]}
          name={"title"}
        >
          <Input placeholder="Kategori Ekleyiniz" />
        </Form.Item>
        <Form.Item className="mb-0 flex justify-end">
          <Button type="primary" htmlType="submit">
            Ekle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
