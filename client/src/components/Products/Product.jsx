import Item from "antd/es/list/Item"
import { useState } from "react"
import ProductItem from "./ProductItem"
import {PlusOutlined,EditOutlined} from '@ant-design/icons'
import Add from "../Products/Add"

import { useNavigate } from "react-router-dom"


const Products = ({categories,filtered,products,setProducts,search}) => {
  
  const [isAddModalOpen,setIsAddModalOpen] = useState(false)
  const navigate = useNavigate()
   
  return (
    <div className='grid grid-cols-card gap-4'>
      {filtered
      .filter((product) => product.title.toLowerCase().includes(search))
      .map((item)=> (
        <ProductItem item={item} key={item._id}/>
      ))}

      {/* Edit and Add Product buttons */}
      <div onClick={() =>setIsAddModalOpen(true)} className="flex justify-center items-center bg-green-500 hover:shadow-lg border select-none
      cursor-pointer transition-all hover:opacity-80 md:size-40 size-20">
         <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div onClick={() =>navigate('/products')} className="flex justify-center items-center bg-yellow-500 hover:shadow-lg border select-none
      cursor-pointer transition-all hover:opacity-80 md:size-40 size-20">
         <EditOutlined className="text-white md:text-2xl"/>
      </div>
      <Add
       isAddModalOpen={isAddModalOpen} 
       setIsAddModalOpen={setIsAddModalOpen}
       categories={categories}
       products={products}
       setProducts={setProducts}/>

       
      
    </div>
  )
}

export default Products
