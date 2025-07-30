import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

const CreateArea: React.FC = () => {
  const { errors } = usePage<PageProps>().props;

  const { data, setData, post, processing } = useForm({
    location: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/areas');
  };

  return (
    <AppLayout>
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Tambah Area</h1>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Simpan
        </button>
      </form>
    </div>
    </AppLayout>
  );
};

export default CreateArea;
