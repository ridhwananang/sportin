import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, Sport } from '@/types';

interface Props extends PageProps {
  sport: Sport;
  recommendations: Sport[];
}

export default function Show() {
  const { sport, auth, recommendations = [] } = usePage<Props>().props;

  return (
    <AppLayout>
      <div className="p-3 max-w-7xl mx-auto">
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
  ← Kembali
</Link>

            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 transition-shadow hover:shadow-3xl">
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

              <div className="p-6 space-y-4 text-gray-900 dark:text-gray-200">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300">
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    <strong className="font-semibold">Deskripsi:</strong>{' '}
                    {sport.description || 'Tanpa deskripsi.'}
                  </p>
                </div>

                <p className="text-lg">
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
                </p>

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

                <div>
                  {auth.user ? (
                    <Link
                      href={route('bookings.create', sport.id)}
                      className="inline-block mt-6 px-8 py-3 bg-green-600 text-white rounded-full shadow-lg
                        hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2
                        transition duration-300 active:scale-95"
                    >
                      Booking Sekarang
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="inline-block mt-6 px-8 py-3 bg-gray-500 text-white rounded-full shadow-lg
                        hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2
                        transition duration-300 active:scale-95"
                    >
                      Login untuk Booking
                    </Link>
                  )}
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

                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
