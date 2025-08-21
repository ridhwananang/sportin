import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Sport } from '@/types';

interface Props extends PageProps {
  sport: Sport;
  recommendations: Sport[];
}

export default function Show() {
  const { sport, recommendations = [], auth } = usePage<Props>().props;

  // Pastikan images selalu array
  const images = sport.images ?? [];

  // Modal state
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

  return (
    <AppLayout>
      <div className="p-3 w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Detail Sport 65% */}
          <div className="md:col-span-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
                {sport.name}
              </h1>
              <Link
                href="/sports"
                className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:brightness-110 transition duration-300"
              >
              bacck
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 transition-shadow hover:shadow-3xl">

              {/* Main image */}
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

              {/* Gallery images */}
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

              <div className="p-6 space-y-4 text-gray-900 dark:text-gray-200">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300">
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    <strong className="font-semibold">Deskripsi:</strong>{' '}
                    {sport.description || 'Tanpa deskripsi.'}
                  </p>
                </div>

                {/* <p className="text-lg">
                  <strong className="font-semibold">Tipe:</strong>{' '}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      sport.type === 'team'
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100'
                        : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    }`}
                  >
                    {sport.type === 'team' ? 'Tim' : 'Individu'}
                  </span>
                </p> */}

                <p className="text-lg">
                  <strong className="font-semibold">Harga:</strong>{' '}
                  <span className="text-red-600 dark:text-red-400 font-bold">
                    Rp{sport.price.toLocaleString()}
                  </span>
                </p>

                <p className="text-lg">
                  <strong className="font-semibold">Area:</strong>{' '}
                  {sport.areas?.length > 0 ? (
                    <span className="inline-flex flex-wrap gap-3 mt-1">
                      {Array.from(
                        new Map(sport.areas.map((a) => [a.location, a])).values()
                      ).map((area) => (
                        <span
                          key={area.id}
                          className="inline-block bg-gradient-to-r from-blue-400 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg cursor-default select-none transition-transform hover:scale-110"
                          title={`Area: ${area.location}`}
                        >
                          {area.location}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="italic text-gray-500 dark:text-gray-400">
                      Belum diatur
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>Alamat:</strong>{' '}
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
                <div className="mt-4">
  <Link
    href={route('bookings.create', { sport: sport.id })}
    className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:brightness-110 transition"
  >
    Booking Sekarang
  </Link>
</div>
              </div>
            </div>
          </div>

          {/* Rekomendasi 35% */}
          <div className="md:col-span-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Rekomendasi Olahraga
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {recommendations.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/sports/${rec.id}`}
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {rec.image ? (
                    <img
                      src={`/storage/${rec.image}`}
                      alt={rec.name}
                      className="w-full h-40 object-cover rounded-t-xl"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-28 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm rounded-t-xl">
                      Tidak ada gambar
                    </div>
                  )}

                  <div className="p-2 space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                      {rec.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {rec.description || 'Tanpa deskripsi'}
                    </p>
                    <p className="inline-block bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 text-xs font-semibold px-2 py-1 rounded-full shadow">
                      Rp{rec.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {rec.areas?.length > 0
                        ? rec.areas.map((area) => area.location).join(', ')
                        : 'Belum diatur'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {rec.areas?.length > 0
                        ? rec.areas.map((area) => area.address).join(', ')
                        : 'Belum diatur'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="max-w-3xl w-full p-4">
            <img
              src={modalImage}
              alt="Preview"
              className="w-full h-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // supaya klik di image tidak menutup modal
            />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
