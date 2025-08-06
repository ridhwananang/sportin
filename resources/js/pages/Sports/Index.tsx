import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Sport } from '@/types';

interface Props extends PageProps {
  sports: Sport[];
}

export default function Index() {
  const { sports } = usePage<Props>().props;

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Daftar Olahraga</h1>
          <Link
            href="/sports/create"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
          >
            + Tambah
          </Link>
        </div>

        {sports.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Belum ada data olahraga.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sports.map((sport) => (
              <div
                key={sport.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {sport.image ? (
                 <img src={`/storage/${sport.image}`} alt={sport.name} />

                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm">
                    Tidak ada gambar
                  </div>
                )}
                 
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {sport.name}
                  </h2>
                  <div className="text-sm font-medium text-gray-800 dark:text-white">
                    {sport.description || 'Tanpa Deskripsi'}
                  </div>
                  
                </div>
                <div className="p-4 space-y-2">
                 
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Tipe:</span> {sport.type === 'team' ? 'Tim' : 'Individu'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Harga:</span> Rp{sport.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Area:</span>{' '}
                    {sport.areas && sport.areas.length > 0
                      ? sport.areas.map((a) => a.location).join(', ')
                      : 'Belum diatur'}
                  </p>

                  <div className="pt-3">
                    <Link
                      href={`/sports/${sport.id}/edit`}
                      className="inline-block text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
