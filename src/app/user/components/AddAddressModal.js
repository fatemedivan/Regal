import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function AddAddressModal({
  handleCloseModal,
  handleOpenDetailsModal,
}) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerRef = useRef(null);

  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");
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
              iconUrl: "/img/location-sign-2.svg",
              iconSize: [48, 64],
            }),
          }).addTo(map);
        }

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          setAddress(data.display_name);
          sessionStorage.setItem("full address", data.display_name);
        } catch {
          setAddress("دریافت آدرس ممکن نشد");
        }
      });
    })();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      sessionStorage.setItem("full address", searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    sessionStorage.removeItem("addressId");
    sessionStorage.removeItem("full address");
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => handleCloseModal()}
      />
      <div className="bg-white fixed left-0 z-60 w-165 h-155 p-6 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bottom-auto rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <p className=" text-black text-lg font-bold leading-5.5">
            افزودن آدرس
          </p>
          <Image
            width={24}
            height={24}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer "
            alt=""
            onClick={() => handleCloseModal()}
          />
        </div>
        <div>
          <p className="text-sm leading-6 text-neutral-gray-10 mb-6">
            موقعیت مکانی را روی نقشه مشخص کنید.
          </p>
          <div ref={mapRef} className="h-100 w-full relative rounded-lg z-40" />
          {isSearching ? (
            <>
              <div className="bg-white w-145 h-89 p-4 rounded-xl absolute z-60 top-30 mx-4">
                <div className="border border-black flex items-center gap-1 px-4 py-3.75 rounded-lg bg-white">
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
                    onFocus={() => setIsSearching(true)}
                    onBlur={() => setIsSearching(false)}
                    autoFocus
                    className="peer w-full outline-none placeholder:text-neutral-gray-7 placeholder:text-xs placeholder:leading-4.5"
                  />
                  <div className="bg-white px-1 absolute top-1 text-xs leading-4.5 text-neutral-gray-10">
                    جستجوی آدرس
                  </div>
                  <Image
                    width={16}
                    height={16}
                    className={` ${
                      searchQuery ? "block" : "hidden"
                    } cursor-pointer `}
                    onClick={() => setSearchQuery("")}
                    src="/img/close-circle.svg"
                    alt=""
                  />
                </div>
                {searchQuery && (
                  <div className="flex items-center gap-2 border-b border-neutral-gray-4 pb-4 cursor-pointer mt-4 mr-4">
                    <Image
                      width={16}
                      height={16}
                      src="/img/location-4.svg"
                      alt=""
                    />
                    <p>{searchQuery}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              className={`relative -top-98 mx-5 mt-4 z-60 flex items-center gap-1 px-4 py-3.75 rounded-lg bg-white ${
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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isSearching ? "" : "جستجوی آدرس"}
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
          )}

          <div
            className={`flex justify-center items-center w-full relative ${
              isSearching ? "top-8" : "bottom-10"
            }`}
          >
            <button
              onClick={() => {
                handleCloseModal();
                handleOpenDetailsModal();
              }}
              className="rounded-lg bg-cognac-primery py-3.25 w-full text-white flex justify-center items-center cursor-pointer"
            >
              تائید و ادامه
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
