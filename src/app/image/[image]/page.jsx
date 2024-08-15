"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ImageProfile({ params: { image } }) {
  const back = useRouter();
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{ backgroundColor: "#000" }}
    >
      <div
        style={{
          borderLeft: "2px solid white",
          borderBottom: "2px solid white",
          width: "15px",
          height: "15px",
          position: "absolute",
          top: "0",
          left: "0",
          margin: "20px",
          transform: "rotate(45deg)",
          cursor: "pointer",
        }}
        onClick={() => back.back()}
      ></div>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
        width={200}
        height={200}
        className="object-cover w-96"
        style={{ border: "2px solid black" }}
      />
    </div>
  );
}
