import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Area } from '@/types';

interface Props extends PageProps {
  areas: Area[];
}

export default function Create() {
  const { areas } = usePage<Props>().props;

const { data, setData, post, processing, errors } = useForm<{
  name: string;
  type: 'team' | 'individual';
  description: string;
  price: number;
  image: File | null;
  images: File[];
  active: boolean;
  area_ids: number[];
}>({
  name: '',
  type: 'team',
  description: '',
  price: 0,
  image: null,
  images: [],
  active: true,
  area_ids: [],
});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('sports.store'));
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4">
  <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-all">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Tambah Olahraga
          </h1>

      <form
  onSubmit={handleSubmit}
  encType="multipart/form-data"
  className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl max-w-2xl mx-auto space-y-6"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Nama */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama</label>
      <input
        type="text"
        value={data.name}
        onChange={e => setData('name', e.target.value)}
        placeholder="Masukkan nama olahraga"
        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2
         focus:ring-blue-500 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
    </div>

    {/* Tipe */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe</label>
      <select
        value={data.type}
        onChange={e => setData('type', e.target.value as 'team' | 'individual')}
        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2
         focus:ring-blue-500 shadow-sm"
      >
        <option value="team">Tim</option>
        <option value="individual">Individu</option>
      </select>
      {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type}</p>}
    </div>

    {/* Harga */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Harga</label>
      <input
        type="number"
        value={data.price}
        onChange={e => setData('price', Number(e.target.value))}
        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 
        focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
      <select
        value={String(data.active)}
        onChange={e => setData('active', e.target.value === 'true')}
        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="true">Aktif</option>
        <option value="false">Tidak Aktif</option>
      </select>
      {errors.active && <p className="text-sm text-red-500 mt-1">{errors.active}</p>}
    </div>
  </div>

  {/* Deskripsi (full width) */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
    <textarea
      value={data.description}
      onChange={e => setData('description', e.target.value)}
      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 h-28
       resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      placeholder="Tuliskan deskripsi olahraga..."
    />
    {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
  </div>

  {/* Gambar */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gambar</label>
    <input
      type="file"
      accept="image/*"
      onChange={e => setData('image', e.target.files?.[0] || null)}
      className="w-full file:bg-blue-100 file:text-blue-700 dark:file:bg-gray-700 dark:file:text-white file:px-4 file:py-2 
      file:rounded-xl file:border-0 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
    />
    {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
  </div>

  {/* Gambar Tambahan */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Gambar Tambahan (bisa pilih lebih dari satu)
    </label>
    <input
      type="file"
      name="images[]"
      multiple
      accept="image/*"
      onChange={e => setData('images', Array.from(e.target.files || []))}
      className="w-full file:bg-blue-100 file:text-blue-700 dark:file:bg-gray-700 dark:file:text-white file:px-4
       file:py-2 file:rounded-xl file:border-0 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
    />
    <p className="text-xs text-gray-500 mt-1">
      Kamu bisa memilih beberapa gambar sekaligus.
    </p>
    {errors.images && <p className="text-sm text-red-500 mt-1">{errors.images}</p>}
  </div>

  {/* Area */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Area (multi pilih)</label>
    <select
      multiple
      value={data.area_ids.map(String)}
      onChange={e =>
        setData(
          'area_ids',
          Array.from(e.target.selectedOptions).map(option => Number(option.value))
        )
      }
      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2
       focus:ring-blue-500 shadow-sm"
    >
      {areas.map(area => (
        <option key={area.id} value={area.id}>
          {area.location} - {area.address}
        </option>
      ))}
    </select>
    {errors.area_ids && <p className="text-sm text-red-500 mt-1">{errors.area_ids}</p>}
  </div>

  {/* Submit */}
  <div className="pt-4">
    <button
      type="submit"
      disabled={processing}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-xl shadow-md
       transition-all duration-300 disabled:opacity-60" > Simpan</button>
  </div>
</form>
        </div>
      </div>
    </AppLayout>
  );
}
// Komponen reusable form field
function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
