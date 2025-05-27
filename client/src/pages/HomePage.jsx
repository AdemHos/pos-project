import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Product";
import Cart from "../components/Cart/Cart";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import 'dotenv'

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
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

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="flex justify-between px-6 gap-10 md:flex-row flex-col pb-24 md:pb-0 ">
        <div
          id="categories"
          className=" max-h-[calc(100vh_-_112px)] overflow-y -auto md:pb-10"
        >
          <Categories
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            products={products}
          />
        </div>
        <div className="flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
          <Products
            categories={categories}
            filtered={filtered}
            products={products}
            setProducts={setProducts}
            search={search}
          />
        </div>
        <div className="md:-mr-[24px] md:-mt-[24px]  border-l border-blue-500">
          <Cart />
        </div>
      </div>
      ): <Spin size="large" className="absolute w-screen h-screen flex items-center justify-center"/>}
      
    </>
  );
};

export default HomePage;
