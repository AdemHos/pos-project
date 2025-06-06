import { addProduct } from "../../redux/cartSlice"
import { useDispatch } from "react-redux"

const ProductItem = ({item}) => {
  
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(addProduct({...item,quantity: 1}))
  }
  
  return (
    
       <div onClick={handleClick} className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
         <div className="product-img">
           <img
             src={item.img}
             alt=""
             className="w-full h-28 object-cover aspect-square"
           />
         </div>
         <div className="product-info flex flex-col p-3">
           <span className="font-bold">{item.title}</span>
           <span>{item.price}₺</span>
         </div>
         </div>
  )
}

export default ProductItem
