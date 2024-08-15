"use client";
import axios from "axios";
import Image from "next/image";
import userIcon from "@/asset/icons/user.svg";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Users() {
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/all?key=a`
    );
    setUserData(data.data);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="flex w-full justify-around flex-wrap mt-5">
      {userData.data?.length > 0 ? (
        <>
          {userData.data?.map((el, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-lg mb-4 h-max cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <Link
                  href={
                    el.profilePitcure == null
                      ? ""
                      : `/image/${el.profilePitcure}`
                  }
                >
                  <Image
                    src={
                      el.profilePitcure == null
                        ? userIcon
                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${el.profilePitcure}`
                    }
                    width={200}
                    height={200}
                    alt={el.username}
                    className="w-14 h-14 rounded-full object-cover"
                    style={{ border: "2px solid black" }}
                  />
                </Link>
                <div>
                  <h1 className="text-lg font-semibold">{el.username}</h1>
                  <p className="text-gray-600">{el.email}</p>
                  <p className="text-gray-800 text-xs py-2">
                    {el.phoneNumber == null
                      ? "Nomer ponsel belum terdaftar"
                      : el.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="mt-2 md:mt-0"></div>
            </div>
          ))}
        </>
      ) : (
        <div className="w-full h-screen justify-center items-center flex text-2xl">
          Not Found
        </div>
      )}
    </div>
  );
}
