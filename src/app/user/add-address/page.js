"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerRef = useRef(null);

  const [coords, setCoords] = useState(null);
  const [fullAddress, setFullAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    (async () => {
      await import("leaflet/dist/leaflet.css");
      const L = await import("leaflet");

      if (!mapRef.current || leafletMapRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([35.6892, 51.389], 13);
      leafletMapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "",
        }
      ).addTo(map);

      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        setCoords({ lat, lng });

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], {
            icon: L.icon({
              iconUrl: "/img/location-sign.svg",
              iconSize: [24, 32],
            }),
          }).addTo(map);
        }

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          setFullAddress(data.display_name);
          sessionStorage.setItem('full address',data.display_name)
        } catch(error) {
          console.log(error);
        }
      });
    })();
  }, []);

  return (
    <div className="lg:hidden">
      <div className="flex justify-between items-center mb-8 px-5 pt-6">
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/arrow-right-6.svg"
          alt="بستن"
          onClick={() => router.back()}
        />
        <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
          افزودن آدرس
        </p>
        <div></div>
      </div>
      {isSearching ? (
        <div className="px-5 mb-73">
          <div
            className={`relative flex items-center justify-between gap-1 px-4 py-3.75 rounded-lg border border-black mb-6`}
          >
            <Image
              width={16}
              height={16}
              src="/img/search-normal-2.svg"
              alt=""
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="peer w-full outline-none placeholder:text-neutral-gray-7 placeholder:text-xs placeholder:leading-4.5"
            />
            <div
              className={`bg-white px-1 absolute right-4 -top-3 text-xs leading-4.5 text-neutral-gray-10`}
            >
              جستجوی آدرس
            </div>
            <Image
              width={16}
              height={16}
              className={` ${searchQuery ? "block" : "hidden"} cursor-pointer `}
              onClick={() => setSearchQuery("")}
              src="/img/close-circle.svg"
              alt=""
            />
          </div>
          {searchQuery && (
            <Link href={"/user/addresses/details-address"}>
              <div className="flex items-center gap-2 border-b border-neutral-gray-4 pb-4 cursor-pointer">
                <Image
                  width={16}
                  height={16}
                  src="/img/location-4.svg"
                  alt=""
                />
                <p>{searchQuery}</p>
              </div>
            </Link>
          )}
        </div>
      ) : (
        <>
          <p className="text-sm leading-6 text-neutral-gray-10 mb-4 px-5">
            موقعیت مکانی را روی نقشه مشخص کنید.
          </p>

          <div ref={mapRef} className="h-100 w-full mb-4 relative z-40" />
          <div
            className={`relative -top-100 mx-5 z-60 flex items-center gap-1 px-4 py-3.75 rounded-lg bg-white ${
              isSearching && "border border-black"
            }`}
          >
            <Image
              width={16}
              height={16}
              src="/img/search-normal-2.svg"
              alt=""
            />
            <input
              type="text"
              value={searchQuery}
              placeholder={isSearching ? "" : "جستجوی آدرس"}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              className="peer w-full outline-none placeholder:text-neutral-gray-7 placeholder:text-xs placeholder:leading-4.5"
            />
            <div
              className={`bg-white px-1 absolute right-4 -top-3 text-xs leading-4.5 text-neutral-gray-10 ${
                isSearching ? "block" : "hidden"
              }`}
            >
              جستجوی آدرس
            </div>
          </div>
          <div className="flex items-center justify-center mt-6 px-5 pb-6">
            <div className="p-5 rounded-2xl border border-neutral-gray-4 max-w-max">
              <Link href={"/user/details-address"}>
                <button
                  className="bg-cognac-primery rounded-lg py-3.5 px-28 text-white text-sm cursor-pointer"
                  onClick={() => {
                    if (coords && fullAddress) {
                      console.log("مختصات انتخاب‌شده:", coords);
                      console.log("آدرس انتخاب‌شده:", fullAddress);
                    }
                  }}
                >
                  افزودن آدرس
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
