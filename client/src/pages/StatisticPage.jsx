import React,{useState,useEffect}from 'react'
import Header from '../components/Header/Header'
import StatisticCard from '../components/Statistic/StatisticCard'
import { Area, Pie } from "@ant-design/plots";




const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"))
  
  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const asyncFetch = () => {
    fetch(import.meta.env.VITE_SERVER_URL + "/api/invoices/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
   data: data,
    angleField: 'subTotal',
    colorField: 'customerName',
    innerRadius: 0.6,
    label: {
      text: 'customerName',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Toplam\nDeğer',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
  };
  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };
  return (
    <>
    <Header/>
      <div className="px-6 pb-20 md:pb-20">
       <h1 className="font-semibold text-4xl text-center mb-4">İstatistiklerim</h1>
       <div>
        <h2 className='text-lg'>Hoş Geldin <span className='text-green-700 font-bold text-xl'>{user.username}</span></h2>
        <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4 ">
          <StatisticCard title={'Toplam Müşteri'} amount={data?.length} image={'images/user.png'}/>
          <StatisticCard title={'Toplam Kazanç'} amount={totalAmount()} image={'images/money.png'}/>
          <StatisticCard title={'Toplam Satış'} amount={data?.length} image={'images/sale.png'}/>
          <StatisticCard title={'Toplam Ürün'} amount={products?.length} image={'images/product.png'}/>
        </div>
        <div className='flex justify-between gap-10 lg:flex-row flex-col '>
          <div className='lg:w-1/2 lg:h-full h-72'>
             <Area {...config} />
          </div>
          <div className='lg:w-1/2 lg:h-full h-72'>
             <Pie {...config2} />
          </div>
        </div>
       </div>
      </div>
    </>
  )
}

export default StatisticPage
