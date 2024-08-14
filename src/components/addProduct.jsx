"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import plus from "@/asset/icons/plus.svg";
import { curency } from "@/utils/curency";

export default function AddProduct() {
  // const [images, setImages] = useState([]);
  const [fileSelect, setFileSelect] = useState(null);
  const [preview, setPreview] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDeskription] = useState("");
  const [error, setError] = useState(false);

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const imageFiles = files.map((file) => URL.createObjectURL(file));
  //   setImages((prevImages) => [...prevImages, ...imageFiles]);
  // };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    setFileSelect(file);

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleUploadData = async () => {
    const formData = new FormData();
    formData.append("image", fileSelect);
    formData.append("product_name", productName);
    formData.append("product_price", productPrice);
    formData.append("product_description", productDescription);

    if (
      !(
        productName &&
        productDescription &&
        (productPrice || isNaN(productPrice) || productPrice <= 1000) &&
        fileSelect
      )
    )
      return setError(true);
    else {
      setError(false);
      const upData = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product?key=a`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (upData) {
        location.reload();
        return;
      }
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full mb-5" style={{ borderBottom: "2px solid black" }}>
        <h1 className="p-3 text-2xl text-center">Tambahkan Produk Baru</h1>
      </div>
      <div className="w-full flex items-center flex-col">
        <div className="forms flex-col" style={{ width: "80%" }}>
          <div className="addMainImage my-3">
            <h1 className="py-3">Tambahkan Gambar</h1>
            <input type="file" accept="image/*" onChange={handleMainImage} />
            {preview && (
              <Image
                src={preview}
                width={50}
                height={50}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  margin: "5px",
                }}
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              placeholder="Masukkan nama produk"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              onChange={(e) => setProductDeskription(e.target.value)}
            />
          </div>
          {error && <h1 className="text-red">*Data tidak lengkap</h1>}

          {/* <div className="mb-4 mt-5">
            <h1 className="py-4">Tambahkan gambar lain:</h1>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          <div className="image-preview flex flex-wrap">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={100}
                height={100}
                alt={`preview-${index}`}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  margin: "5px",
                }}
              />
            ))}
          </div> */}
        </div>
        <button
          className="bg-green text-white py-2 px-5 rounded"
          onClick={handleUploadData}
        >
          Add New
        </button>
      </div>
    </div>
  );
}
