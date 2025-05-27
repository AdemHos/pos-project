import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";


const PrintInvoice = ({ isModalOpen, setIsModalOpen, customer }) => {
  

  return (
    <div>
      <Modal
        title="Fatura Yazdır"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        {/* Invoice Section */}
        <section className="py-20 bg-black" >
          <div className="max-w-5xl mx-auto bg-white px-6">
            <article className="overflow-hidden">
              {/* Invoice Logo */}
              <div className="logo my-6">
                <h2 className="font-bold text-4xl">
                  <span className="text-blue-500 italic font-light">Well</span>
                  POS
                </h2>
              </div>
              {/* Invoice Details */}
              <div className="invoice-details">
                <div className="grid sm:grid-cols-4 grid-cols-3 gap-12 ">
                  <div className="text-sm text-slate-500">
                    <p className="font-bold text-slate-800">Fatura Detayı :</p>
                    <p>{customer?.customerName}</p>
                    <p>Fake Street 123</p>
                    <p>San Javier</p>
                    <p>CA 1234</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p className="font-bold text-slate-800">Fatura :</p>
                    <p>Boring Company</p>
                    <p>Tesla Street 005</p>
                    <p>Frsco</p>
                    <p>CA 000</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <div>
                      <p className="font-bold text-slate-800">
                        Fatura Numarası:
                      </p>
                      <p>000{Math.floor(Math.random() * 100)}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 mt-2">
                        Veriliş Tarihi:
                      </p>
                      <p>{customer?.createdAt.substring(0, 10)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 sm:block hidden">
                    <div>
                      <p className="font-bold text-slate-800">Şartlar:</p>
                      <p>10 Gün</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 mt-2">Vade:</p>
                      <p>18/07/2025</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Invoice Table Area */}
              <div className="invoice-table-area mt-8">
                <table className="min-w-full divide-y divide-slate-700 overflow-hidden">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th
                        scope="col"
                        className="py-3.5  text-left 
                                text-sm font-normal text-slate-700 hidden sm:table-cell"
                      >
                        Görsel
                      </th>
                      <th
                        scope="col"
                        className="py-3.5  text-left 
                                text-sm font-normal text-slate-700 sm:table-cell hidden "
                      >
                        Başlık
                      </th>
                      <th
                        scope="col"
                        colSpan={"4"}
                        className="py-3.5  text-left 
                                text-sm font-normal text-slate-700 sm:hidden"
                      >
                        Başlık
                      </th>
                      <th
                        scope="col"
                        className="py-3.5  text-center 
                                text-sm font-normal text-slate-700 hidden sm:table-cell"
                      >
                        Fiyat
                      </th>
                      <th
                        scope="col"
                        className="py-3.5  text-center
                                text-sm font-normal text-slate-700 hidden sm:table-cell"
                      >
                        Adet / Kg
                      </th>
                      <th
                        scope="col"
                        className="py-3.5  text-end 
                                text-sm font-normal text-slate-700 "
                      >
                        Toplam
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer?.cartItems.map((item,index) => (
                      <tr className="border-b border-slate-300" key={index}>
                        <td className="py-4 sm:table-cell hidden">
                          <img
                            src={item.img}
                            alt=""
                            className="w-12 h-12 object-contain"
                          />
                        </td>
                        <td className="py-4 sm:table-cell hidden  ">
                          <div className="flex flex-col">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs inline-block sm:hidden">
                              Birim Fiyatı {item.price}
                            </span>
                          </div>
                        </td>
                        <td className="py-4  sm:hidden" colSpan={"4"}>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs inline-block sm:hidden">
                              Birim Fiyatı {item.price}
                            </span>
                          </div>
                        </td>
                        <td className="py-4  text-center sm:table-cell hidden">
                          <span>{item.price.toFixed(2)} ₺</span>
                        </td>
                        <td className="py-4 text-center sm:table-cell hidden ">
                          <span>{item.quantity}</span>
                        </td>
                        <td className="py-4  text-end">
                          <span>
                            {(item.price * item.quantity).toFixed(2)}₺
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        className="text-right pt-4 sm:table-cell hidden"
                        colSpan={"4"}
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">
                          Ara Toplam
                        </span>
                      </th>
                      <th
                        className="text-right pt-4 sm:hidden"
                        colSpan={"4"}
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">
                          Ara Toplam
                        </span>
                      </th>

                      <th className="text-right pt-6" colSpan={"4"} scope="row">
                        <span className="font-normal text-slate-700">
                          {customer?.subTotal}₺
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th
                        className="text-right pt-4 sm:table-cell hidden"
                        colSpan={"4"}
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">KDV</span>
                      </th>
                      <th
                        className="text-right pt-4 sm:hidden"
                        colSpan={"4"}
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">KDV</span>
                      </th>
                      <th className="text-right pt-4" colSpan={"4"} scope="row">
                        <span className="font-normal text-red-600">
                          +{customer?.tax}₺
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th
                        className="text-right pt-4 sm:table-cell hidden"
                        colSpan={"4"}
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">
                          Genel Toplam
                        </span>
                      </th>
                      <th
                        className="text-right pt-4 sm:hidden"
                        colSpan={"4"}
                        scope="row"
                      >
                        <span className="font-normal text-slate-700">
                          Genel Toplam
                        </span>
                      </th>
                      <th className="text-right pt-4" colSpan={"4"} scope="row">
                        <span className="font-normal text-slate-700">
                          {customer?.totalAmount}₺
                        </span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
                <div className="py-9">
                  <div className="border-t border-slate-300 pt-9">
                    <p className="text-sm font-light text-slate-800">
                      Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                      Ödeme Yasası 000'a göre, serbest çalışanların borçlarını
                      ödememesi durumunda 00.00 gecikme ücreti talep etme
                      hakkına sahip olduklarını ve bu noktada bu ücrete ek
                      olarak yeni bir fatura sunulacağını lütfen unutmayın.
                      Revize faturanın 14 gün içinde ödenmemesi durumunda vadesi
                      geçmiş hesaba ek faiz ve %8 yasal oran artı %0.5 Bank of
                      England tabanlı olmak üzere toplam %8.5 uygulanacaktır.
                      Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <div className="flex justify-end mt-4">
          <Button type="primary" size="large" onClick={() => print()}>
            Yazdır
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PrintInvoice;
