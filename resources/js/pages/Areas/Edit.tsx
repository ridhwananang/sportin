import React, { useState } from 'react';
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
      <h1 className="text-2xl font-bold mb-4">Edit Area</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Lokasi</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData('location', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Alamat</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
    </AppLayout>
  );
};

export default EditArea;
