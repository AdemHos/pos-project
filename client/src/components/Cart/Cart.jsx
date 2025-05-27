import { Button } from "antd";
import { ClearOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItem,
  increase,
  decrease,
  reset,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-_-90px)]">
      <h2
        className="bg-blue-500 text-center text-white py-4 tracking-wide
     font-bold"
      >
        Sepetteki Ürünler
      </h2>
      <ul className="flex flex-col gap-y-2 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="flex items-center justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-cover"
                    onClick={() => dispatch(deleteCartItem(item))}
                  />
                  <div className="flex flex-col ml-4">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ x{item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 mr-2">
                  <Button
                    onClick={() => dispatch(increase(item))}
                    type="primary"
                    size="medium"
                    className="w-full flex items-center justify-center rounded-full bg-blue-600"
                    icon={<PlusOutlined />}
                  />
                  <span className="font-bold">{item.quantity}</span>
                  <Button
                    onClick={() => dispatch(decrease(item))}
                    type="primary"
                    size="medium"
                    className="w-full flex items-center justify-center rounded-full bg-blue-600"
                    icon={<MinusOutlined />}
                  />
                </div>
              </li>
            ))
          : "Sepette Hiç Ürün Yok"}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total.toFixed(2)}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              +{((cart.total * cart.tax) / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between p-2">
            <b className="text-green-600 text-xl">Genel Toplam</b>
            <span className="text-xl">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full "
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Sepete Git
          </Button>
          <Button
            onClick={() => {
              if (window.confirm("Sepet Sıfırlansın mı ?")) {
                dispatch(reset());
                localStorage.setItem(
                  "cart",
                  JSON.stringify({
                    cartItems: [],
                    total: 0,
                    subTotal: 0,
                    tax: 0,
                  })
                );
              }
            }}
            disabled={cart.cartItems.length === 0}
            type="primary"
            icon={<ClearOutlined />}
            size="large"
            className="w-full mt-2"
            danger
          >
            Sepeti Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
