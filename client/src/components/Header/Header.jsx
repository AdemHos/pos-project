import { useSelector } from 'react-redux'
import './Header.css'
import {Badge, Input, message} from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {BarChartOutlined, CopyOutlined, HomeOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined} from '@ant-design/icons'

const Header = ({setSearch}) => {
  const cart = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const logOut = () => {
    if(window.confirm("Çıkış Yapmak İstediğinize Emin misiniz ?")) {
      localStorage.removeItem("posUser")
      navigate('/login')
      message.success("Çıkış işlemi başarılı")
    }
  }

  return (
    <div className='border-b mb-4'>
      <header className='px-6 py-4 flex items-center justify-between gap-10'>
        <div>
            <Link to="/">
            <h2 className='text-2xl font-semibold md:text-4xl'> <span className='text-2xl italic font-bold text-blue-500 md:text-4xl'>Well</span>POS</h2>
            </Link>
        </div>
        <div className='flex-1 flex justify-center'
        onClick={() => {
          pathname !== '/' && navigate('/')
        }}>
            <Input 
            size='large'
             prefix={<SearchOutlined />} 
             placeholder='Ara' 
             className='rounded-xl max-w-[800px]'
             onChange={(e) =>setSearch(e.target.value.toLowerCase())}/>
        </div>
        <div className='flex gap-7 items-center justify-between text-center md:static fixed z-50 bottom-0 md:w-auto w-screen bg-white md:bg-transparent md:border-t-0 border-t
        md:px-0 px-8 py-1'>
          <Link to={'/'} className={`menu-link ${
            pathname === '/' && "active"
          }`}>
          <HomeOutlined className='text-xl md:text-2xl'/>
          <span className='md:text-xs text-[10px] text'>Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} color='#3b82f6' className='md:flex hidden'  >
          <Link to={'/cart'}className={`menu-link ${
            pathname === '/cart' && "active"
          }`}>
          <ShoppingCartOutlined className='text-xl md:text-2xl'/>
          <span className='md:text-xs text-[10px] text'>Sepet</span>
          </Link>
          </Badge>
          <Link to={'/invoices'} className={`menu-link ${
            pathname === '/invoices' && "active"
          }`}>
          <CopyOutlined className='text-xl md:text-2xl'/>
          <span className='md:text-xs text-[10px] text'>Faturalar</span>
          </Link>
          <Link to={'/customers'} className={`menu-link ${
            pathname === '/customers' && "active"
          }`}>
          <UserOutlined className='text-xl md:text-2xl'/>
          <span className='md:text-xs text-[10px] text'>Müşteriler</span>
          </Link>
          <Link to={'/statistic'} className={`menu-link ${
            pathname === '/statistic' && "active"
          }`}>
          <BarChartOutlined className='text-xl md:text-2xl'/>
          <span className='md:text-xs text-[10px] text'>İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link  className='flex flex-col items-center hover:text-red-500 transition-all'>
          <LogoutOutlined className='text-xl md:text-2xl'/>
          <span className='md:text-xs text-[10px] text'>Çıkış Yap</span>
          </Link>
          </div>
        </div>
        <Badge count={cart.cartItems.length} color='#3b82f6'
        className='md:hidden flex' >
          <Link to={'/'} className='flex flex-col items-center hover:text-blue-500 transition-all'>
          <ShoppingCartOutlined className='text-xl md:text-2xl'/>
          <span className='md:text-xs text-[10px] text'>Sepet</span>
          </Link>
          </Badge>
      </header>
    </div>
  )
}

export default Header
