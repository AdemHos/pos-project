import React, { useState } from 'react'
import { Modal,Form, Input, Select, Card,Button} from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import {reset} from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const CreateInvoice = ({isModalOpen,setIsModalOpen}) => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
        const res = await  fetch(import.meta.env.VITE_SERVER_URL +'/api/invoices/add-invoice',{
            method: "POST",
            body: JSON.stringify({
              ...values,
              subTotal: cart.total,
              tax: ((cart.total * cart.tax) /100).toFixed(2),
              totalAmount: (cart.total+ (cart.total*cart.tax)/100).toFixed(2),
              cartItems: cart.cartItems,
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          if(res.status === 200) {
            dispatch(reset)
            navigate('/invoices')
     
          }
        } catch (error) {
          console.log(error)
        }
    }
    

  return (
    <div>
      <Modal title='Fatura Oluştur' open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)} >
       <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Müşteri İsmi / Adres'
           rules={[{required: true,message: 'Username is required'}]}
           name={'customerName'}>
             <Input placeholder='Müşteri İsmi'/>
          </Form.Item>
          <Form.Item label='Telefon Numarası' 
          rules={[{required: true,
            message: 'User phone is required'
          }]}
          name={'customerPhoneNumber'}
          >
             <Input placeholder='Telefon Numarası Giriniz' maxLength={11}/>
          </Form.Item>
          <Form.Item label='Ödeme Yöntemi' rules={[{required: true,message: 'Payment way is required'}]}
          name={'paymentMode'}>
             <Select placeholder='Bir Ödeme Yöntemi Seçiniz'>
                <Select.Option value='Nakit'>Nakit</Select.Option>
                <Select.Option value='Kredi Kartı'>Kredi Kartı</Select.Option>
             </Select>
          </Form.Item>
          <div className='flex justify-end mt-4'>
          <Card className='w-72'>
           <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{(cart.total).toFixed(2)}₺</span>
           </div>
           <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className='text-red-600'>+{((cart.total * cart.tax)/100).toFixed(2)}₺</span>
           </div>
           <div className="flex justify-between">
            <b>Toplam</b>
            <b>{(cart.total+ (cart.total*cart.tax)/100).toFixed(2)} ₺</b>
           </div>
           <div className='flex justify-end mt-4'>
           <Button type='primary' size='medium' className=''
           onClick={() =>setIsModalOpen(true)}
           htmlType='submit' >
                Sipariş Oluştur
            </Button>
           </div>
          </Card>
          </div>
       </Form>
     </Modal>
    </div>
  )
}

export default CreateInvoice
