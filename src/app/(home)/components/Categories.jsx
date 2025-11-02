"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { catDesktop, catMobile } from "@/constants/category";

export default function Categories() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const categoriesRes = await fetch("/api/category");
        if (categoriesRes.ok) {
          const categoryDate = await categoriesRes.json();
          setData(categoryDate);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  return (
    <section className="container mx-auto px-5 mb-16">
      <h5 className="font-semibold leading-5 text-black mt-16 mb-6">
        دسته بندی محصولات
      </h5>
      <div className="flex justify-center gap-2 lg:hidden overflow-x-auto">
        {catMobile.map((column, i) => (
          <div key={i} className="flex flex-col gap-2 flex-shrink-0">
            {column.map((cat) => (
              <Link
                key={cat.linkId}
                href={`/products?categoryId=${cat.linkId}`}
              >
                <div className="relative w-[40vw] max-w-[167px] h-auto">
                  <Image
                    src={cat.img}
                    alt={data[cat.dataIndex]?.name || ""}
                    className="w-full h-auto object-contain"
                    width={cat.width}
                    height={cat.height}
                    quality={100}
                  />
                  <div className="absolute bottom-1 px-2">
                    <h5 className="leading-5 font-semibold text-white">
                      {data[cat.dataIndex]?.name}
                    </h5>
                    <div className="flex flex-wrap items-center gap-1 mt-1 mb-2 text-white">
                      {cat.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px] whitespace-nowrap"
                        >
                          <p className="text-xs leading-4.5">{tag}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden lg:grid grid-cols-4 grid-rows-6 gap-5">
        {catDesktop.map((cat) => (
          <div
            key={cat.linkId}
            // onClick={() =>
            //   router.push(`/products?categoryId=${cat.linkId}&page=1`)
            // }
            className={`${cat.gridClass} relative rounded-xl overflow-hidden`}
          >
            <Image
              src={cat.img}
              alt={`دسته‌بندی ${cat.dataIndex + 1}`}
              className="w-full h-full object-cover"
              width={318}
              height={cat.height}
              quality={100}
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">{data[cat.dataIndex]?.name}</h5>
              <div className="flex gap-2 mt-2">
                {cat.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
