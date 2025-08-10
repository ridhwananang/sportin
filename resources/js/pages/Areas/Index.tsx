import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { PageProps, Area } from '@/types';
import AppLayout from '@/layouts/app-layout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

interface Props extends PageProps {
  areas: Area[];
}

const AreaIndex: React.FC = () => {
  const { areas } = usePage<Props>().props;

  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const openDeleteModal = (area: Area) => {
    setSelectedArea(area);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedArea) {
      router.delete(`/areas/${selectedArea.id}`, {
        onFinish: () => {
          setShowModal(false);
          setSelectedArea(null);
        },
      });
    }
  };

  return (
    <AppLayout>
      <div className="p-6 w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daftar Area</h1>
          <Link
            href="/areas/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
          >
            Tambah Area
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Lokasi</th>
                <th className="px-5 py-3">Alamat</th>
                <th className="px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {areas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500 dark:text-gray-400">
                    Tidak ada data area
                  </td>
                </tr>
              ) : (
                areas.map((area, index) => (
                  <tr
                    key={area.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-5 py-3">{index + 1}</td>
                    <td className="px-5 py-3">{area.location}</td>
                    <td className="px-5 py-3">{area.address}</td>
                    <td className="px-5 py-3 space-x-4">
                      <Link
                        href={`/areas/${area.id}/edit`}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(area)}
                        className="text-red-600 hover:underline font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ConfirmDeleteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          itemName={selectedArea?.location ?? ''}
        />
      </div>
    </AppLayout>
  );
};

export default AreaIndex;
