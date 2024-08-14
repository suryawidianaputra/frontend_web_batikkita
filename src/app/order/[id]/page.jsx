"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function OrderDetail({ params: { id } }) {
  const [processp, setProcess] = useState({});

  const getProcessByProcessId = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/process/${id}?key=a`
    );
    setProcess(data.data);
  };

  useEffect(() => {
    getProcessByProcessId();
  }, []);
  return (
    <>
      <div>
        <h1>Hallo, World</h1>
      </div>
    </>
  );
}
