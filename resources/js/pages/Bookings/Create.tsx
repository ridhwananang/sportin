import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Sport, Area, User } from '@/types';

interface Props extends PageProps {
  sport: Sport;
  areas: Area[];
  user: User;
}

export default function Create() {
  const { sport, areas, user, errors } = usePage<Props>().props;

  const [form, setForm] = useState({
    customer_name: user.name,
    area_id: '',
    start_at: '',
    end_at: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(`/sports/${sport.id}/bookings`, form);
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Booking {sport.name}</h1>
          <Link href={`/sports/${sport.id}`} className="text-sm text-gray-500 hover:underline dark:text-gray-300">← Kembali</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Customer</label>
            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              className="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
            {errors.customer_name && <p className="text-red-500 text-sm">{errors.customer_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Area</label>
            <select
              name="area_id"
              value={form.area_id}
              onChange={handleChange}
              className="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">-- Pilih Area --</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.location} - {area.address}
                </option>
              ))}
            </select>
            {errors.area_id && <p className="text-red-500 text-sm">{errors.area_id}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Waktu Mulai</label>
            <input
              type="datetime-local"
              name="start_at"
              value={form.start_at}
              onChange={handleChange}
              className="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
            {errors.start_at && <p className="text-red-500 text-sm">{errors.start_at}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Waktu Selesai</label>
            <input
              type="datetime-local"
              name="end_at"
              value={form.end_at}
              onChange={handleChange}
              className="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
            {errors.end_at && <p className="text-red-500 text-sm">{errors.end_at}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
            >
              Booking Sekarang
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
