import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, Sport } from '@/types';
import { FaStar, FaRestroom, FaToilet, FaUtensils, FaCrown, FaChair } from "react-icons/fa";

interface Props extends PageProps {
  sport: Sport;
  recommendations: Sport[];
}

export default function Show() {
  const { sport, auth, recommendations = [] } = usePage<Props>().props;

  // --- Gallery (statis dulu) ---
  const images = sport.images ?? [];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <AppLayout>
      <div className="p-3 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

          {/* --- Kiri: Gambar & Thumbnail --- */}
          <div className="md:col-span-6">
            <img
              src={selectedImage}
              alt="Product"
              className="w-full max-h-[450px] object-cover rounded-2xl shadow-md"
            />
            <div className="flex gap-3 mt-4 justify-center">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 transition-transform hover:scale-105 ${
                    selectedImage === img ? "border-indigo-500" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* --- Kanan: Detail Produk --- */}
          <div className="md:col-span-6 space-y-5">
            {/* Judul & Tombol Back */}
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {sport.name}
              </h1>
              <Link
                href="/sports"
                className="ml-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:brightness-110 transition duration-300"
              >
                ← Kembali
              </Link>
            </div>

            {/* Alamat Utama */}
            <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
              Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, 
              Daerah Khusus Ibukota Jakarta 10270
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                1.6M reviews
              </span>
            </div>

            {/* Harga */}
            <p className="text-2xl font-bold text-red-600">
              Rp {sport.price.toLocaleString("id-ID")}
            </p>

            {/* Deskripsi */}
            <div>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {sport.description || "Tanpa deskripsi."}
              </p>
            </div>

            {/* Facility */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Facility</h2>
              <div className="flex gap-6 flex-wrap">
                <div className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-300">
                  <FaRestroom className="text-2xl text-blue-500" /> Wasit
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-300">
                  <FaToilet className="text-2xl text-indigo-500" /> Toilet
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-300">
                  <FaUtensils className="text-2xl text-red-500" /> Kantin
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-300">
                  <FaCrown className="text-2xl text-yellow-500" /> VIP Room
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-300">
                  <FaChair className="text-2xl text-purple-500" /> Tribun
                </div>
              </div>
            </div>

            {/* Form Booking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

                <div className="mt-6 flex justify-end pr-4">
        {auth.user ? (
          <Link
            href={route('bookings.create', sport.id)}
            className="inline-block px-10 py-3.5 rounded-full 
              bg-gray-600 text-white font-semibold shadow-md text-center
              transition duration-300 hover:bg-gray-700 active:scale-95"
          >
            BOOKINHG
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-block px-10 py-3.5 rounded-full 
              bg-gray-500 text-white font-semibold shadow-md text-center
              transition duration-300 hover:bg-gray-600 active:scale-95"
          >
            Login untuk Booking
          </Link>
        )}
</div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
