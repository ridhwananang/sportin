import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Area, PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Props extends PageProps {
  area: Area;
}

const EditArea: React.FC = () => {
  const { area, errors } = usePage<Props>().props;

  const { data, setData, put, processing } = useForm({
    location: area.location,
    address: area.address,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/areas/${area.id}`);
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Area</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="location" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Lokasi
              </label>
              <input
                id="location"
                type="text"
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
                className={`w-full rounded-md border px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="off"
              />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Alamat
              </label>
              <input
                id="address"
                type="text"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                className={`w-full rounded-md border px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                autoComplete="off"
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition disabled:opacity-50"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditArea;
