import { Button, Form, Input, Modal, Table ,message,Select } from "antd";
import Item from "antd/es/list/Item";
import React, { useState,useEffect  } from "react";

const Edit = () => {
  const [products,setProducts] = useState([])
  const [isEditModalOpen,setIsEditModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [editingItem,setEditingItem] = useState({})
  const [categories,setCategories] = useState([])
  useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/products/get-all")
            const data = await res.json()
            setProducts(data)
          } catch (error) {
            console.log(error)
          }
        }
        const getCategories = async () => {
          try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/get-all")
            const data = await res.json()
            data && setCategories(data.map((item) => {
              return {...item, value:item.title}
            }))
          } catch (error) {
            console.log(error)
          }
        }
        getCategories()
        getProducts()
      },[])
  const onFinish = (values) => {
    try {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/products/update-product",{
            method: "PUT",
            body: JSON.stringify({...values,productId:editingItem._id}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        message.success("Ürün Başarıyla Güncellendi")
        setProducts(products.map((item) => {
            if(item._id === editingItem._id) {
              return values
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
            fetch(import.meta.env.VITE_SERVER_URL + "/api/products/delete-product",{
                method: "DELETE",
                body: JSON.stringify({productId: id}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
    
            })
            message.success("Ürün Başarıyla  Silindi")
            setProducts(products.filter((item) => item._id !== id))
        } catch (error) {
            message.error("Birşeyler Yanlış Gitti")
            console.log(error)
        }
    }
  }

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render:(_, record) => {
          return <p>{record.title}</p>
      }
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        
          return <img src={record.img} alt="" className="w-24 h-24 object-cover aspect-square" />
        
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <Button type="link" onClick={() => {
              setIsEditModalOpen(true)
              setEditingItem(record)
            }}  className="pl-0">
              Düzenle
            </Button>
            <Button type="text" danger onClick={() =>deleteCategory(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
    <Table
          bordered
          dataSource={products}
          columns={columns}
          rowKey={"_id"}
          scroll={{
            x: 1000,
            y: 600
          }}
        />
        <Modal
      title="Yeni Ürün Ekle"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
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
          <Input placeholder="Ürün Görseli Ekleyiniz" />
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
          <Input placeholder="Ürün Fiyatı" />
        </Form.Item>
        <Form.Item label='Kategori'
        rules={[{
          required: true,
          message: "Kategori Seçimi Zorunludur"
        }]}
        name={'category'}>
         <Select
            showSearch
            placeholder="Kategori Seç"
            optionFilterProp="title"
            options={categories}
            
          />
        </Form.Item>
        
        <Form.Item className="mb-0 flex justify-end">
          <Button type="primary" htmlType="submit">
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </>
    
      
        
      
  
  );
};

export default Edit;
