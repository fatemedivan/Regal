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
          sessionStorage.setItem("full address", data.display_name);
        } catch (error) {
          console.log(error);
        }
      });
    })();
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("addressId");
    sessionStorage.removeItem("full address");
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

      <div>
        <p className="text-sm leading-6 text-neutral-gray-10 mb-4 px-5">
          موقعیت مکانی را روی نقشه مشخص کنید.
        </p>

        <div ref={mapRef} className="h-100 w-full mb-4 relative z-40" />

        <div className="flex items-center justify-center mt-6 px-5 pb-6">
          <div className="p-5 rounded-2xl border border-neutral-gray-4 max-w-max">
            <Link href={"/user/details-address"}>
              <button className="bg-cognac-primery rounded-lg py-3.5 px-28 text-white text-sm cursor-pointer">
                افزودن آدرس
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
