import Image from "next/image";
import React from "react";

export default function CommentBox({
  img,
  name,
  city,
  title,
  desc,
  rating = 5,
}) {
  const totalStars = 5;
  const filledStars = Array(rating).fill("/img/star-fill.svg");
  const emptyStars = Array(totalStars - rating).fill("/img/star-outline.svg");
  return (
    <div className="min-w-64.5">
      <div className="flex items-center gap-2 mb-4">
        <Image width={48} height={48} quality={100} src={img} alt="" />

        <div className="flex justify-between w-full">
          <div>
            <p className="leading-7 text-black">{name}</p>
            <p className="text-neutral-gray-11 text-xs leading-4.5">{city}</p>
          </div>
          <Image
            width={20}
            height={20}
            quality={100}
            src="/img/comment-virgol.svg"
            alt=""
          />
        </div>
      </div>
      <div>
        <p className="text-neutral-gray-13 text-sm leading-5 lg:text-[20px] lg:leading-8.5">
          {title}
        </p>
        <p className="text-neutral-gray-13 text-xs leading-4.5 mt-1 mb-2 lg:text-[1rem] lg:leading-7">
          {desc}
        </p>
        <div className="flex items-center gap-1">
          {emptyStars.map((src, index) => (
            <Image
              width={16}
              height={16}
              key={`empty-${index}`}
              src={src}
              alt="star-empty"
              quality={100}
            />
          ))}
          {filledStars.map((src, index) => (
            <Image
              width={16}
              height={16}
              key={`filled-${index}`}
              src={src}
              alt="star-filled"
              quality={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
