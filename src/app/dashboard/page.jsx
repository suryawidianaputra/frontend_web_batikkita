"use client";
import { useSearchParams } from "next/navigation";
import NavigationBar from "@/components/navigationbar";
import Orders from "@/components/orders";
import AddProduct from "@/components/addProduct";
import Products from "@/components/products";
import Users from "@/components/users";

export default function App() {
  const searchParams = useSearchParams();
  const search = searchParams.get("page");

  return (
    <div className="flex">
      <NavigationBar />
      {search === "orders" && <Orders />}
      {search === "addProduct" && <AddProduct />}
      {search === "products" && <Products />}
      {search === "users" && <Users />}
    </div>
  );
}
