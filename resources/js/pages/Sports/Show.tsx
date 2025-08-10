import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, Sport } from '@/types';

interface Props extends PageProps {
  sport: Sport;
}

export default function Show() {
  const { sport, auth } = usePage<Props>().props;

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {sport.name}
          </h1>
          <Link
            href="/sports"
            className="text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            ← Kembali
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {sport.image ? (
            <img
              src={`/storage/${sport.image}`}
              alt={sport.name}
              className="w-full max-h-[400px] object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm">
              Tidak ada gambar
            </div>
          )}

          <div className="p-6 space-y-4 text-gray-800 dark:text-gray-300">
            <p>
              <strong>Deskripsi:</strong> {sport.description || 'Tanpa deskripsi.'}
            </p>
            <p>
              <strong>Tipe:</strong> {sport.type === 'team' ? 'Tim' : 'Individu'}
            </p>
            <p>
              <strong>Harga:</strong> Rp{sport.price.toLocaleString()}
            </p>
            <p>
              <strong>Area:</strong>{' '}
              {sport.areas?.length > 0
                ? sport.areas.map((a) => a.location).join(', ')
                : 'Belum diatur'}
            </p>

            <div>
              {auth.user ? (
                <Link
                  href={route('bookings.create', sport.id)}
                  className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md
                    hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300"
                >
                  Booking Sekarang
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-block mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md
                    hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 transition duration-300"
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
