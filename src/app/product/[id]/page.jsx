"use client";
import { curency } from "@/utils/curency";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import editIcon from "@/asset/icons/edit.svg";

export default function ProductDetail({ params: { id } }) {
  const [product, setProduct] = useState({});
  const [edit, setEdit] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [error, setError] = useState(false);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}?key=a`
      );
      const data = response.data.data;
      setProduct(data);
      setProductName(data.product_name);
      setProductPrice(data.product_price);
      setProductDescription(data.product_description);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const updateProduct = async () => {
    if (!(productName && productDescription && productPrice)) {
      return setError(true);
    } else {
      const upData = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}?key=a`,
        {
          product_name: productName,
          product_price: parseInt(productPrice),
          product_description: productDescription,
        }
      );
    }
    getProduct();
    setEdit(false);
  };

  const deleteProduct = async () => {
    const deleteProduct = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}?key=a`
    );
    if (deleteProduct) {
      window.location.href = `/dashboard?page=products`;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {!edit ? (
        <>
          <div className="flex flex-col items-center p-2 bg-white shadow-md rounded-md">
            <div>
              <div
                className="flex w-full justify-end"
                style={{ width: "100%" }}
              >
                <Image
                  src={editIcon}
                  height={30}
                  width={30}
                  className="absolute m-4 hover:cursor-pointer"
                  onClick={() => setEdit(true)}
                />
              </div>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.product_images}`}
                height={200}
                width={200}
                className="w-[300px] h-[300px] object-cover mb-2"
                alt={product.product_name}
              />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">
              Nama: {product.product_name}
            </h1>
            <h1 className="text-md font-medium text-gray-600">
              Harga: {curency(product.product_price)}
            </h1>
            <h1 className="text-md text-gray-500">
              Deskripsi: {product.product_description}
            </h1>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-2/5">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                placeholder="Masukkan nama produk"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Harga Produk
              </label>
              <input
                type="number"
                placeholder="Masukkan harga produk"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={productPrice}
                onChange={(e) => setProductPrice(parseInt(e.target.value))}
              />
              <p>{curency(productPrice)}</p>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Deskripsi Produk
              </label>
              <textarea
                placeholder="Masukkan deskripsi produk"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                style={{ resize: "none" }}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              {error && <h1 className="text-red">*Data tidak lengkap</h1>}
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  className="bg-blue-500 text-white bg-red px-4 py-2 rounded hover:bg-blue-600"
                  onClick={deleteProduct}
                >
                  Delete Product
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="bg-gray-300 text-white bg-red px-4 py-2 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  className="bg-blue-500 text-white bg-green px-4 py-2 rounded hover:bg-blue-600"
                  onClick={updateProduct}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
