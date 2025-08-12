import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import type { PageProps, Sport, User } from '@/types';

interface Props extends PageProps {
  sports: Sport[];
  auth: {
    user: User;
  };
}

export default function Index() {
  const { sports, auth } = usePage<Props>().props;
  const role = auth?.user?.role ?? '';
  const isSuperAdmin = role === 'super_admin';

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const handleDelete = (sport: Sport) => {
    setSelectedSport(sport);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedSport) return;
    router.delete(`/sports/${selectedSport.id}`, {
      onSuccess: () => {
        setModalOpen(false);
        setSelectedSport(null);
      },
    });
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Daftar Olahraga
          </h1>
          {isSuperAdmin && (
            <Link
              href="/sports/create"
              className="inline-block bg-blue-600 hover:bg-blue-700 focus:bg-blue-800
                text-white font-semibold px-5 py-2 rounded-md shadow-md
                transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              + Tambah
            </Link>
          )}
        </div>

        {sports.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
            Belum ada data olahraga.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sports.map((sport) => (
              <Link
                key={sport.id}
                href={`/sports/${sport.id}`}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-md
                  hover:shadow-lg transition-shadow duration-300 overflow-hidden
                  focus:outline-none focus:ring-4 focus:ring-indigo-500"
              >
                {sport.image ? (
                  <img
                    src={`/storage/${sport.image}`}
                    alt={sport.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center
                    bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm rounded-t-xl"
                  >
                    Tidak ada gambar
                  </div>
                )}

                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {sport.name}
                  </h2>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 min-h-[3rem]">
                    {sport.description || 'Tanpa Deskripsi'}
                  </p>
                </div>

                <div className="p-4 space-y-1 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Tipe:</span> {sport.type === 'team' ? 'Tim' : 'Individu'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Harga:</span> Rp{sport.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    <span className="font-medium">Area:</span>{' '}
                    {sport.areas?.length
                      ? sport.areas.map((a) => a.location).join(', ')
                      : 'Belum diatur'}
                  </p>

                  {isSuperAdmin && (
                    <div className="pt-3 flex items-center gap-4">
  <Link
    href={`/sports/${sport.id}/edit`}
    onClick={(e) => e.stopPropagation()}
    className="
      inline-block
      px-3
      py-1
      rounded-full
      bg-blue-100
      dark:bg-blue-700
      text-blue-700
      dark:text-blue-200
      text-sm
      font-medium
      hover:bg-blue-200
      dark:hover:bg-blue-600
      focus:outline-none
      focus:ring-2
      focus:ring-blue-400
      transition
    "
  >
    Edit
  </Link>
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleDelete(sport);
    }}
    className="
      inline-block
      px-3
      py-1
      rounded-full
      bg-red-100
      dark:bg-red-700
      text-red-700
      dark:text-red-200
      text-sm
      font-medium
      hover:bg-red-200
      dark:hover:bg-red-600
      focus:outline-none
      focus:ring-2
      focus:ring-red-400
      transition
    "
  >
    Hapus
  </button>
</div>

                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <ConfirmDeleteModal
          show={modalOpen}
          itemName={selectedSport?.name || ''}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </AppLayout>
  );
}
