import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Sport, Area, User } from '@/types';
import { FaStar, FaRestroom, FaToilet, FaUtensils, FaCrown, FaChair } from "react-icons/fa";

interface Props extends PageProps {
  sport: Sport;
  recommendations: Sport[];
   areas: Area[];
  user: User;
}

export default function Show() {
const { sport, auth, areas, errors, recommendations = [] } = usePage<Props>().props;

  // --- Gallery (statis dulu) ---
  const images = sport.images ?? [];
  const [selectedImage, setSelectedImage] = useState(images[0]);

   const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
  
    const openModal = (img: string) => {
      setModalImage(img);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
      setModalImage(null);
    };

    const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 24; hour++) {
      const start = hour.toString().padStart(2, "0") + ":00";
      const end = (hour + 1).toString().padStart(2, "0") + ":00";
      slots.push({ start, end, label: `${start} - ${end}` });
    }
    return slots;
  };

   const [form, setForm] = useState({
  customer_name: auth?.user?.name || '',
  area_id: '',
  date: '',
  start_at: '',
  end_at: '',
});
  
    const timeSlots = generateTimeSlots();
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const time_slot =
      form.start_at && form.end_at ? `${form.start_at}-${form.end_at}` : '';
  
    router.post(`/sports/${sport.id}/bookings`, {
      customer_name: form.customer_name,
      area_id: form.area_id,
      date: form.date,
      time_slot,
    });
  };
  
  return (
    <AppLayout>
      <div className="p-3 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

          {/* --- Kiri: Gambar & Thumbnail --- */}
          <div className="md:col-span-6">
            {sport.image ? (
                <img
                  src={`/storage/${sport.image}`}
                  alt={sport.name}
                  className="w-full max-h-[400px] object-cover rounded-t-2xl"
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm font-medium select-none rounded-t-2xl">
                  Tidak ada gambar
                </div>
              )}
            <div className="flex gap-3 mt-4 justify-center">
{images.length > 0 && (
                <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, idx) => {
                    const imgSrc = typeof img === 'string' ? img : img.image;
                    return (
                      <div
                        key={idx}
                        className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        onClick={() => openModal(`/storage/${imgSrc}`)}
                      >
                        <img
                          src={`/storage/${imgSrc}`}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-40 object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
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
             {sport.areas?.length > 0 ? (
                    sport.areas.map((area) => (
                      <span key={area.id} className="block">
                        {area.address}
                      </span>
                    ))
                  ) : (
                    <span className="italic">Belum diatur</span>
                  )}
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
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
              <select
              id="time_slot"
              name="time_slot"
              value={form.start_at ? `${form.start_at}-${form.end_at}` : ""}
              onChange={(e) => {
                const [start, end] = e.target.value.split("-");
                setForm({ ...form, start_at: start, end_at: end });
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value="">-- Pilih Jam --</option>
              {timeSlots.map((slot, i) => (
                <option key={i} value={`${slot.start}-${slot.end}`}>
                  {slot.label}
                </option>
              ))}
            </select>
            {(errors.start_at || errors.end_at) && (
              <p className="mt-1 text-sm text-red-500">
                {errors.start_at || errors.end_at}
              </p>
            )}
            </div>

                <div className="mt-6 flex justify-end pr-4">
        {auth.user ? (
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md
              hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Booking Sekarang
          </button>
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
</form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
