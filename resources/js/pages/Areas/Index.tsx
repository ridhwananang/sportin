import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps, Area } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Props extends PageProps {
  areas: Area[];
}

const AreaIndex: React.FC = () => {
  const { areas } = usePage<Props>().props;

  return (
    <AppLayout>
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Area</h1>
        <Link
          href="/areas/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Area
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Lokasi</th>
            <th className="p-2 border">Alamat</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area, index) => (
            <tr key={area.id} className="border-t">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{area.location}</td>
              <td className="p-2 border">{area.address}</td>
              <td className="p-2 border space-x-2">
                <Link
                  href={`/areas/${area.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </AppLayout>
  );
};

export default AreaIndex;
