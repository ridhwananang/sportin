import React, { FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Area, Sport } from '@/types';
import { router } from '@inertiajs/react';

interface Props extends PageProps {
  sport: Sport;
  areas: Area[];
}

export default function Edit() {
  const { sport, areas } = usePage<Props>().props;

 const { data, setData, errors, processing } = useForm({
  name: sport.name,
  type: sport.type,
  description: sport.description || '',
  price: sport.price,
  image: null as File | null,
  active: sport.active,
  area_ids: sport.areas.map((a) => a.id),
});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('type', data.type);
  formData.append('description', data.description || '');
  formData.append('price', data.price.toString());
  formData.append('active', data.active ? '1' : '0');
  formData.append('_method', 'put'); // ✅ OVERRIDE method Laravel

  data.area_ids.forEach((id, i) => {
    formData.append(`area_ids[${i}]`, id.toString());
  });

  if (data.image) {
    formData.append('image', data.image);
  }

  router.post(route('sports.update', sport.id), formData, {
    preserveScroll: true,
    forceFormData: true,
  });
};

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Olahraga</h1>
<form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
  {/* Grid 2 kolom */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Nama */}
    <div className="space-y-2">
      <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Nama</label>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={data.name}
        onChange={(e) => setData('name', e.target.value)}
      />
      {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
    </div>

    {/* Tipe */}
    <div className="space-y-2">
      <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Tipe</label>
      <select
        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={data.type}
        onChange={(e) => setData('type', e.target.value as 'team' | 'individual')}
      >
        <option value="team">Tim</option>
        <option value="individual">Individu</option>
      </select>
      {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
    </div>

    {/* Harga */}
    <div className="space-y-2">
      <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Harga</label>
      <input
        type="number"
        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={data.price}
        onChange={(e) => setData('price', Number(e.target.value))}
      />
      {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
    </div>

    {/* Status */}
    <div className="space-y-2">
      <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Status</label>
      <select
        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={String(data.active)}
        onChange={(e) => setData('active', e.target.value === 'true')}
      >
        <option value="true">Aktif</option>
        <option value="false">Tidak Aktif</option>
      </select>
      {errors.active && <div className="text-red-500 text-sm">{errors.active}</div>}
    </div>
  </div>

  {/* Deskripsi */}
  <div className="space-y-2">
    <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Deskripsi</label>
    <textarea
      rows={3}
      className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      value={data.description}
      onChange={(e) => setData('description', e.target.value)}
    />
    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
  </div>

  {/* Upload Gambar Baru */}
  <div className="space-y-2">
    <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Gambar Baru</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setData('image', e.target.files?.[0] || null)}
      className="w-full text-sm text-gray-600 dark:text-gray-300"
    />
    {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
  </div>

  {/* Area */}
  <div className="space-y-3">
    <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Area</label>
    <div className="grid grid-cols-2 gap-3">
      {areas.map((area) => (
        <label key={area.id} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            className="form-checkbox accent-blue-600"
            checked={data.area_ids.includes(area.id)}
            onChange={() => {
              const selected = data.area_ids.includes(area.id);
              setData(
                'area_ids',
                selected
                  ? data.area_ids.filter((id) => id !== area.id)
                  : [...data.area_ids, area.id]
              );
            }}
          />
          <span>{area.location}</span>
        </label>
      ))}
    </div>
    {errors.area_ids && <div className="text-red-500 text-sm">{errors.area_ids}</div>}
  </div>

  {/* Tombol Submit */}
  <div className="pt-2">
    <button
      type="submit"
      disabled={processing}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
    >
      Simpan Perubahan
    </button>
  </div>
</form>

      </div>
    </AppLayout>
  );
}
