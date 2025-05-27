import React from "react";
import { Input, Modal, Button, Form ,message, Select } from "antd";

const Add = ({ isAddModalOpen, setIsAddModalOpen,categories,products,setProducts }) => {
    const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori Eklendi");
      form.resetFields();
      setProducts([...products,  {
        ...values,
        _id: Math.random(),
        price: Number(values.price),
      }]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün Ekle"
          rules={[
            {
              required: true,
              message: "Ürün Adı Alanı Boş Bırakılamaz",
            },
          ]}
          name={"title"}
        >
          <Input placeholder="Ürün Görseli Ekleyiniz" />
        </Form.Item>
        <Form.Item
          label="Ürün Görseli Ekle"
          rules={[
            {
              required: true,
              message: "Ürün Görseli Alanı Boş Bırakılamaz",
            },
          ]}
          name={"img"}
        >
          <Input placeholder="Ürün Fiyatı Ekleyiniz" />
        </Form.Item>
        <Form.Item
          label="Ürün Fiyatı Ekle"
          rules={[
            {
              required: true,
              message: "Ürün Fiyatı Alanı Boş Bırakılamaz",
            },
          ]}
          name={"price"}
        >
          <Input placeholder="Kategoriler" />
        </Form.Item>
        <Form.Item
          label="Kategori Seçiniz"
          rules={[
            {
              required: true,
              message: "Kategori Seçmediniz",
            },
          ]}
          name={"category"}
        >
          
          <Select
    showSearch
    placeholder="Kategori Seç"
    optionFilterProp="title"
    options={categories}
    
  />
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
