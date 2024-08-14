"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import overFlow from "@/asset/icons/overflow.svg";
import { curency } from "@/utils/curency";
import { useState, useEffect } from "react";

export default function Orders() {
  const [processData, setProcessData] = useState([]);
  const [filter, setFIlter] = useState("all");

  async function handleClick(value, id) {
    const updateStatus = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/process/${id}?key=a`,
      {
        status: value,
      }
    );
    getProducts();
  }

  const getProducts = async () => {
    const get = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/process?key=a&&filter=${filter}`
    );
    setProcessData(get.data.data);
  };

  useEffect(() => {
    getProducts();
  }, [filter]);

  return (
    <>
      <div className="w-full flex items-center flex-col">
        <div className="flex my-5">
          <h1 className="p-2">filter orders: </h1>
          <select
            className="border"
            onChange={(event) => setFIlter(event.target.value)}
            value={filter}
          >
            <option value="all">Semua</option>
            <option value="mengunggu" key="">
              Menunggu
            </option>
            <option value="diproses" key="">
              Diproses
            </option>
            <option value="dikemas" key="">
              Dikemas
            </option>
            <option value="dikirim" key="">
              Dikirim
            </option>
            <option value="sampai" key="">
              Sudah sampai
            </option>
          </select>
        </div>
        <header className="header-orders">
          <div className="px-2 flex">
            <div className="no">
              <h1>No.</h1>
            </div>
            <div className="users">
              <h1>Users.</h1>
            </div>
            <div className="product-name">
              <h1>Product Name.</h1>
            </div>
            <div className="quantity">
              <h1>Quantity.</h1>
            </div>
            <div className="price">
              <h1>Price.</h1>
            </div>
            <div className="status">
              <h1>Status</h1>
            </div>
          </div>
        </header>
        {/*  */}
        {processData.length > 0 ? (
          <>
            <div className="orders my-5">
              {processData?.map((el, i) => (
                <Link href={`/order/${el.account_id}`}>
                  <div
                    className=" orders-list px-2 flex h-10 items-center my-3 hover:cursor-poin"
                    key={i}
                  >
                    <div className="no">
                      <h1>{el.id}</h1>
                    </div>
                    <div className="users flex">
                      <h1>{el.email}</h1>
                    </div>
                    <div className="product-name">
                      <h1>{el.product_name}</h1>
                    </div>
                    <div className="quantity">
                      <h1>{el.quantity}</h1>
                    </div>
                    <div className="price">
                      <h1>{curency(el.price)}</h1>
                    </div>
                    <div className="price">
                      <select
                        onChange={(e) => handleClick(e.target.value, el.id)}
                        value={el.status}
                      >
                        <option value="menunggu" key="">
                          Menunggu
                        </option>
                        <option value="diproses" key="">
                          Diproses
                        </option>
                        <option value="dikemas" key="">
                          Dikemas
                        </option>
                        <option value="dikirim" key="">
                          Dikirim
                        </option>
                        <option value="sampai" key="">
                          Sudah sampai
                        </option>
                      </select>
                    </div>
                    <Image
                      src={overFlow}
                      alt="overflow"
                      width={25}
                      height={25}
                      className="hover:cursor-pointer"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center items-center h-screen">
            <h1 className="text-2xl p-1">Tidak ada</h1>
            <h1>404</h1>
          </div>
        )}
      </div>
    </>
  );
}
