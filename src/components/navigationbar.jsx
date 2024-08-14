"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "@/asset/images/K.jpg";
import user from "@/asset/icons/user.svg";
import product from "@/asset/icons/product.svg";
import order from "@/asset/icons/order.svg";
import plus from "@/asset/icons/plus_white.svg";

export default function NavigationBar() {
  const searchParams = useSearchParams();
  const search = searchParams.get("page");

  return (
    <>
      <div className="bg-black w-64 h-screen fixed">
        <div className="flex w-full justify-center">
          <Image src={logo} width={170} className="p-3 rounded-full" />
        </div>
        <h1 className="text-3xl text-orange p-3 text-center font-bold">
          Batik Kita
        </h1>
        <div className="line w-full h-1 bg-white"></div>
        <div className="p-2 mx-4">
          <div className="flex">
            <h1
              className="text-xl my-5 px-2 text-white hover:cursor-pointer menu-bar"
              style={{ borderLeft: search === "orders" && "3px solid #ff6500" }}
            >
              <a href="?page=orders">Orders</a>
            </h1>
          </div>
          <div className="flex  ">
            <h1
              className="text-xl my-5 px-2 text-white hover:cursor-pointer menu-bar"
              style={{
                borderLeft: search === "addProduct" && "3px solid #ff6500",
              }}
            >
              <a href="?page=addProduct">Add product</a>
            </h1>
          </div>
          <div className="flex">
            <h1
              className="text-xl my-5 px-2 text-white hover:cursor-pointer menu-bar"
              style={{
                borderLeft: search === "products" && "3px solid #ff6500",
              }}
            >
              <a href="?page=products">Products</a>
            </h1>
          </div>
          <div className="flex">
            <h1
              className="text-xl my-5 px-2 text-white hover:cursor-pointer menu-bar"
              style={{ borderLeft: search === "users" && "3px solid #ff6500" }}
            >
              <a href="?page=users">Users</a>
            </h1>
          </div>
        </div>
      </div>
      <div className="w-80 h-screen"></div>
    </>
  );
}
