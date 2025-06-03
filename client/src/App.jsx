import {useEffect} from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import InvoicesPage from './pages/InvoicesPage'
import CustomersPage from './pages/CustomersPage'
import ProductPage from './pages/ProductPage'
import StatisticPage from './pages/StatisticPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { useSelector } from 'react-redux'

const App = () => {
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  return (
    <>
      <BrowserRouter>
   <Routes>
      <Route path='/' element={<RouteControl>
        <HomePage/>
      </RouteControl>}/>
      <Route path='/cart' element={<RouteControl>
        <CartPage/>
      </RouteControl>}/>
      <Route path='/invoices' element={<RouteControl>
        <InvoicesPage/>
      </RouteControl>}/>
      <Route path='/customers' element={<RouteControl>
        <CustomersPage/>
      </RouteControl>}/>
      <Route path='/statistic' element={<RouteControl>
        <StatisticPage/>
      </RouteControl>}/>
      <Route path='/products' element={<RouteControl>
        <ProductPage/>
      </RouteControl>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App

export const RouteControl = ({children}) => {
  if(localStorage.getItem("posUser")) {
    return children
  }else {
    return <Navigate to={'/login'}/>
  }
}
