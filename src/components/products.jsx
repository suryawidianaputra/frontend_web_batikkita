"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { curency } from "@/utils/curency";
import Link from "next/link";

export default function Chats() {
  const [product, setProduct] = useState([]);
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const getProduct = async () => {
    const product = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product?key=a`
    );
    setProduct(product.data.data);
  };

  // console.log(product);

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {product.length > 0 ? (
        <>
          <div className="flex w-full justify-evenly flex-wrap mt-5 gap-2 mb-3">
            {product.map((el, i) => (
              <Link href={`/product/${el.id}`}>
                <div
                  className="card h-max rounded-xl mt-3"
                  style={{
                    width: "250px",
                  }}
                >
                  <div className="img">
                    <Image
                      src={`${imageUrl}/${el.product_images}`}
                      height={200}
                      width={200}
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        padding: "5px",
                      }}
                      className="card-s rounded-xl"
                    />
                  </div>
                  <div className="pl-2 py-2">
                    <h1 className="text-xl">{el.product_name}</h1>
                    <p>{curency(el.product_price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="text-2xl">Tidak ada Product</h1>
        </div>
      )}
    </>
  );
}
