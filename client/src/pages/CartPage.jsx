import  { useRef, useState } from "react";
import Header from "../components/Header/Header";
import { Table, Card, Button,Input,Space } from "antd";
import { PlusOutlined, MinusOutlined, ClearOutlined } from "@ant-design/icons";
import CreateInvoice from "../components/Cart/CreateInvoice";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease, deleteCartItem } from "../redux/cartSlice";
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText,setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null)
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (selectedKeys,confirm,dataIndex) => {
   confirm();
   setSearchText(selectedKeys[0])
   setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps('title')
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps('category')
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{(text).toFixed(2)}₺</span>;
      },
      sorter: (a,b) => a.price - b.price
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text,record) => {
        return (
          <div className="flex items-center gap-x-2 mr-2">
            <Button
              onClick={() => dispatch(increase(record))}
              type="primary"
              size="small"
              className="w-full flex items-center justify-center rounded-full bg-blue-600"
              icon={<PlusOutlined />}
            />
            <span className="font-bold">{record.quantity}</span>
            <Button
              onClick={() => dispatch(decrease(record))}
              type="primary"
              size="small"
              className="w-full text-center flex items-center justify-center rounded-full bg-blue-600"
              icon={<MinusOutlined />}
            />
          </div>
        );
      },
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (text,record) => {
        return (
          <span>{(record.quantity* record.price).toFixed(2)}₺</span>
        )
      }
    },
    {
      title: 'Actions',
      render : (_,record) => {
        return (
          <Button type="primary"  icon={<ClearOutlined/>} danger onClick={() =>dispatch(deleteCartItem(record))}
          className="flex items-center justify-center">Sil</Button>
        )
      }
    }
    
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          rowKey={'_id'}
          
        />
        <div className="cart-totals flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{(cart.total).toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{cart.tax}</span>
              <span className="text-red-600">+{((cart.total * cart.tax)/100).toFixed(2)} ₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>{(cart.total+ (cart.total*cart.tax)/100).toFixed(2)} ₺</b>
            </div>
            <Button
              type="primary"
              size="large"
              className="w-full mt-4 "
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateInvoice
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default CartPage;
