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
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{sport.name}</h1>
          <Link
            href="/sports"
            className="text-sm text-gray-500 hover:underline dark:text-gray-300"
          >
            ← Kembali
          </Link>
        </div>

        {sport.image ? (
          <img
            src={`/storage/${sport.image}`}
            alt={sport.name}
            className="rounded-lg w-full max-h-[400px] object-cover"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm rounded-lg">
            Tidak ada gambar
          </div>
        )}

        <div className="space-y-2 text-gray-800 dark:text-gray-300">
          <p><strong>Deskripsi:</strong> {sport.description || 'Tanpa deskripsi.'}</p>
          <p><strong>Tipe:</strong> {sport.type === 'team' ? 'Tim' : 'Individu'}</p>
          <p><strong>Harga:</strong> Rp{sport.price.toLocaleString()}</p>
          <p><strong>Area:</strong> {sport.areas?.length > 0 ? sport.areas.map((a) => a.location).join(', ') : 'Belum diatur'}</p>
        </div>

        <div>
          {auth.user ? (
<Link
 href={route('bookings.create', sport.id)}

  className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
>
  Booking Sekarang
</Link>



          ) : (
            <Link
              href="/login"
              className="inline-block mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Login untuk Booking
            </Link>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
