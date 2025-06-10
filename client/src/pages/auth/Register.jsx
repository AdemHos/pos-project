import { Button, Form, Input,Carousel, message } from 'antd'
import { Link } from 'react-router-dom'
import AuthCarousel from '../../components/auth/AuthCarousel'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const onFinish = async (values) => {
    setLoading(true)
    try {
     const res = await fetch(import.meta.env.VITE_SERVER_URL +'/api/auth/register',{
      method: "POST",
      body: JSON.stringify(values),
      headers: {"Content-type":"application/json; charset=UTF-8" }

    })
    if(res.status === 200) {
      message.success("Kayıt İşlemi Başarılı")
      setLoading(false)
      navigate("/login")

    }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='h-screen'>
      <div className='flex justify-between h-full'>
        <div className='flex flex-col justify-center h-full w-full px-10 xl:px-20 '>
        <h1 className='text-center font-bold text-5xl mb-2'><span className='text-blue-500 italic'>Well</span>POS</h1>
        <Form layout='vertical' onFinish={onFinish}>
            <Form.Item
            label='Kullanıcı Adı'
            name={'username'}
            rules={[{
                required: true,
                message: 'Kullanıcı Adı Alanı Boş Bırakılamaz !'
            }]}>
                <Input/>
            </Form.Item>
            <Form.Item
            label='Email'
            name={'email'}
            rules={[{
                required: true,
                message: 'Email Alanı Boş Bırakılamaz !'
            }]}>
                <Input/>
            </Form.Item>
            <Form.Item
            label='Şifre'
            name={'password'}
            rules={[{
                required: true,
                message: 'Şifre Alanı Boş Bırakılamaz !'
            }]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item
            label='Şifre Tekrar'
            name={'passwordAgain'}
            dependencies={['password']}
            rules={[{
                required: true,
                message: 'Şifre Alanı Boş Bırakılamaz !'
            },
            ({getFieldValue}) => ({
              validator(_,value) {
                if(!value || getFieldValue("password") === value) {
                 return Promise.resolve();
                }
                return Promise.reject(
                    new Error ("Girilen Şifreler Aynı Değil")
                )
              }
            })
            
            ]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='subnit' size='large'
                loading={loading}
                className='w-full'>Kayıt Ol</Button>
            </Form.Item>
        </Form>
        <div className='flex justify-center gap-2 mt-4 items-center'>
            Zaten bir hesabınız var mı ?&nbsp;
            <Link to={'/login'} className='text-blue-500 font-bold'>
            Şimdi giriş yap
            </Link>
        </div>
        </div>
        <div className='xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden min-w-[800px] bg-blue-600 h-full'>
        <div className='w-full h-full items-center'>
        <div className='w-full'>
       <Carousel className='!h-full px-6' autoplay>
         <AuthCarousel title='Responsive'
         image='/images/responsive.svg'
         desc='Tüm Cihaz Boyutları ile Uyumluluk'/>
         <AuthCarousel title='İstatistikler'
         image='/images/statistic.svg'
         desc='Geniş Tutulan İstatistikler'/>
         <AuthCarousel title='Müşteri'
         image='/images/customer.svg'
         desc='Müşteri Memnuniyeti Odaklı Çözüm'/>
         <AuthCarousel title='Yönetici Paneli'
         image='/images/admin.svg'
         desc='Tek Noktadan Yönetim İmkanı'/>
       </Carousel>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Register
