import React, { useState } from "react";
import ErrBox from "./Errorbox";
import ActionModal from "./ActionModal";
import DetailsModal from "./DetailsModal";
import EditModal from "./EditModal";

export default function ProductsTable({ products }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mainProductInfo, setMainProductInfo] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newPopularity, setNewPopularity] = useState("");
  const [newSale, setNewSale] = useState("");
  const [newColors, setNewColors] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(isShowDeleteModal);
  console.log(isShowDetailsModal);
  console.log(isShowEditModal);
  

  const deleteModalCancel = () => {
    setIsShowDeleteModal(false);
  };

  const closeDeailsModal = () => {
    setIsShowDetailsModal(false);
  };

  return (
    <div>
      <h1 className="text-3xl mb-3 mt-10">لیست محصولات</h1>
      {/* mobile and tablet design */}
      {products && products.length ? (
        <div className="space-y-4 lg:hidden mr-50 flex flex-wrap gap-2 justify-center items-center mb-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg bg-white shadow m-0"
            >
              <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                <img
                  className="w-20 h-20 rounded-lg bg-cover"
                  src={product.img}
                  alt=""
                />
              </p>
              <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                {product.title}
              </p>
              <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                {product.latestPrice}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => {
                    setIsShowDeleteModal(true);
                    setProductId(product.id);
                    setMainProductInfo(product);
                  }}
                  className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                >
                  حذف
                </button>
                <button
                  onClick={() => {
                    setIsShowEditModal(true);
                    setProductId(product.id);
                    setNewTitle(product.title);
                    setNewPrice(product.latestPrice);
                    setNewCount(product.count);
                    setNewImg(product.img);
                    setNewPopularity(product.popularity);
                    setNewColors(product.colors);
                    setNewSale(product.sale);
                  }}
                  className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => {
                    setIsShowDetailsModal(true);
                    setMainProductInfo(product);
                  }}
                  className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                >
                  مشاهده
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10 mr-50">
          <ErrBox title={"محصولی"} />
        </div>
      )}
      {/* desktop design */}
      <div className="hidden lg:block">
        <div className="lg:flex lg:items-center lg:justify-center">
          {products && products.length ? (
            <div className="rounded-lg p-5 mt-3 bg-white flex justify-center items-center mr-50">
              <table >
                <thead>
                  <tr>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                      عکس
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                      اسم
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                      قیمت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        <img
                          className="w-20 h-20 rounded-lg bg-cover"
                          src={product.img}
                          alt=""
                        />
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        {product.title}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        {product.latestPrice}
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            setProductId(product.id);
                            setMainProductInfo(product);
                          }}
                          className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                        >
                          حذف
                        </button>
                        <button
                          onClick={() => {
                            setIsShowEditModal(true);
                            setProductId(product.id);
                            setNewTitle(product.title);
                            setNewPrice(product.price);
                            setNewCount(product.count);
                            setNewImg(product.img);
                            setNewPopularity(product.popularity);
                            setNewColors(product.colors);
                            setNewSale(product.sale);
                          }}
                          className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => {
                            setIsShowDetailsModal(true);
                            setMainProductInfo(product);
                          }}
                          className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                        >
                          مشاهده
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="lg:hidden flex justify-center items-center mt-10 mr-50">
              <ErrBox title={"محصولی"} />
            </div>
          )}
        </div>
      </div>
      {isShowDeleteModal && (
        <ActionModal
          title={`ایا از حذف "${mainProductInfo.title}" اطمینان دارید ؟`}
          onCancel={deleteModalCancel}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onClose={closeDeailsModal}>
            <div className="flex justify-center items-center">

          <table>
            <thead>
              <tr>
                <th className="px-5 py-3">اسم</th>
                <th className="px-5 py-3">رنگ بندی</th>
                <th className="px-5 py-3">محبوبیت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5">{mainProductInfo.title}</td>
                <td className="px-5">{mainProductInfo.colors}</td>
                <td className="px-5">{mainProductInfo.popularity}</td>
              </tr>
            </tbody>
          </table>
            </div>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal onSubmit={()=> setIsShowEditModal(false)}>
          <div>
            <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
              <input
                className="outline-none"
                type="text"
                placeholder="عنوان جدید را وارد کنید"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
              <input
                className="outline-none"
                type="text"
                placeholder="قیمت جدید را وارد کنید"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
              <input
                className="outline-none"
                type="text"
                placeholder="عکس جدید را وارد کنید"
                value={newImg}
                onChange={(e) => setNewImg(e.target.value)}
              />
            </div>
            <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
              <input
                className="outline-none"
                type="text"
                placeholder="موجودی جدید را وارد کنید"
                value={newCount}
                onChange={(e) => setNewCount(e.target.value)}
              />
            </div>
            <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
              <input
                className="outline-none"
                type="text"
                placeholder="رنگ بندی جدید را وارد کنید"
                value={newColors}
                onChange={(e) => setNewColors(e.target.value)}
              />
            </div>
            <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
              <input
                className="outline-none"
                type="text"
                placeholder="میزان محبوبیت جدید را وارد کنید"
                value={newPopularity}
                onChange={(e) => setNewPopularity(e.target.value)}
              />
            </div>
            <div className="py-3 pl-6 pr-3 rounded-xl mb-3  text-black bg-cognac-tint-4">
              <input
                className="outline-none"
                type="text"
                placeholder="میزان فروش جدید را وارد کنید"
                value={newSale}
                onChange={(e) => setNewSale(e.target.value)}
              />
            </div>
          </div>
        </EditModal>
      )}
    </div>
  );
}
