import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import type { PageProps, Sport, User } from "@/types";
import { FiSearch, FiSliders } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

interface Props extends PageProps {
  sports: Sport[];
  auth: { user: User };
}

export default function Dashboard() {
  const { sports, auth } = usePage<Props>().props;
  const role = auth?.user?.role ?? "";
  const isSuperAdmin = role === "super_admin";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  // Search lokal
  const [q, setQ] = useState("");

  const handleDelete = (sport: Sport) => {
    setSelectedSport(sport);
    setModalOpen(true);
  };

  const formatRp = (n: number | string) =>
    typeof n === "number" ? `Rp.${n.toLocaleString("id-ID")}` : `Rp.${n}`;

  // ========== HERO SLIDER ==========
  const heroImages = [
    "/img/hero.jpg",
    "/img/hero1.jpg",
    "/img/hero2.jpg",
    "/img/hero3.jpg",
    "/img/hero4.jpg",
  ];

  const gradients = [
    "from-[#00c6fb] via-[#005bea] to-[#f0faff]",
    "from-[#d4fc79] via-[#96e6a1] to-[#f0fff4]",
    "from-[#ffecd2] via-[#fcb69f] to-[#fff5f5]",
    "from-[#232526] via-[#414345] to-[#e0e0e0]",
    "from-[#2c3e50] via-[#000000] to-[#434343]",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <AppLayout>
      <section className="relative w-full">
        {/* HERO SLIDER */}
        <div className="relative h-[260px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-b-3xl">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center 
                bg-gradient-to-r ${gradients[index % gradients.length]} 
                ${index === current ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
              {/* Card gambar */}
              <div className="max-w-[90%] sm:max-w-[70%] md:max-w-[60%] bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-4">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-full max-h-[280px] sm:max-h-[320px] md:max-h-[360px] object-contain mx-auto"
                />
              </div>
            </div>
          ))}

          {/* Dots navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? "bg-yellow-400 w-6" : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="w-full px-4 sm:px-6 mt-6">
          <div className="flex items-center gap-3 max-w-3xl mx-auto bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-lg p-2">
            {/* Search */}
            <div className="flex-1 flex items-center pl-2">
              <FiSearch className="text-gray-400 text-xl mr-2" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder:text-gray-400 py-2"
              />
            </div>
            {/* Filter */}
            <button
              type="button"
              className="p-3 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md transition"
              aria-label="Filter"
            >
              <FiSliders className="text-gray-600 dark:text-gray-200 text-xl" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= CARD SHOP ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 mb-16">
        <div className="flex justify-between items-center mb-4">
          {isSuperAdmin && (
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
              Mode Admin
            </div>
          )}
        </div>

        {sports.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
            Belum ada data olahraga.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {sports
              .filter((s) =>
                q ? (s.name ?? "").toLowerCase().includes(q.toLowerCase()) : true
              )
              .map((sport) => (
                <Link
                  key={sport.id}
                  href={`/sports/${sport.id}`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden focus:outline-none focus:ring-4 focus:ring-indigo-500/40"
                >
                  {/* Gambar */}
                  <div className="relative">
                    {sport.image ? (
                      <img
                        src={`/storage/${sport.image}`}
                        alt={sport.name}
                        className="w-full h-32 sm:h-48 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-32 sm:h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm">
                        Tidak ada gambar
                      </div>
                    )}
                    {/* Badge */}
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                      PT PUT
                    </span>
                  </div>

                  {/* Konten */}
                  <div className="p-2 sm:p-4">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white truncate">
                      {sport.name}
                    </h3>

                    {/* Rating & Lokasi */}
                    <div className="mt-0.5 sm:mt-1 flex items-center text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 gap-1 sm:gap-2">
                      <AiFillStar className="text-yellow-400 text-xs sm:text-base" />
                      <span>4.9</span>
                      <span className="mx-0.5 sm:mx-1">|</span>
                      <span className="truncate">
                        {sport.areas?.length
                          ? sport.areas.map((a) => a.location).join(", ")
                          : "Lokasi belum diatur"}
                      </span>
                    </div>

                    {/* Deskripsi */}
                    <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-gray-700 dark:text-gray-300 min-h-[2.5rem] line-clamp-2">
                      {sport.description || "Tanpa Deskripsi"}
                    </p>

                    {/* Harga */}
                    <div className="mt-2 sm:mt-4">
                      <span className="text-red-600 font-bold text-xs sm:text-base">
                        {typeof sport.price === "number"
                          ? formatRp(sport.price)
                          : `Rp.${sport.price}`}
                      </span>
                      <span className="text-gray-500 text-[10px] sm:text-sm">
                        /sesi
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </section>

      {/* Modal */}
      <ConfirmDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
        }}
        title="Hapus Data"
        message={
          selectedSport ? `Hapus ${selectedSport.name}?` : "Yakin hapus data ini?"
        }
      />
    </AppLayout>
  );
}
