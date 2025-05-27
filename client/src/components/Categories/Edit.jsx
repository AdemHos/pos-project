import { Button, Form, Input, Modal, Table ,message } from "antd";
import Item from "antd/es/list/Item";
import React, { useState } from "react";

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories,setCategories }) => {
  const [editingRow, setEditingRow] = useState({});
  const onFinish = (values) => {
    try {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/update-category",{
            method: "PUT",
            body: JSON.stringify({...values,categoryId:editingRow._id}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        message.success("Kategori Güncellendi")
        setCategories(categories.map((item) => {
            if(item._id === editingRow._id) {
                return {...item, title: values.title}
            }
            return item
        }))
    } catch (error) {
      message.error("Birşeyler Yanlış Gitti")
      console.log(error);
    }
  };
   
  const deleteCategory = (id) => {
    if(window.confirm("Silmek İstediğinize Emin misiniz?")) {
        try {
            fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/delete-category",{
                method: "DELETE",
                body: JSON.stringify({categoryId: id}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
    
            })
            message.success("Kategori Silindi")
            setCategories(categories.filter((item) => item._id !== id))
        } catch (error) {
            message.error("Birşeyler Yanlış Gitti")
            console.log(error)
        }
    }
  }

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name={"title"}>
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditingRow(record)} className="pl-0">
              Düzenle
            </Button>
            <Button type="text" htmlType="submit" >Kaydet</Button>
            <Button type="text" danger onClick={() =>deleteCategory(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
      title="Kategori İşlemleri"
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
