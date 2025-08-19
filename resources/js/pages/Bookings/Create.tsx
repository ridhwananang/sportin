import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Sport, Area, User } from '@/types';

interface Props extends PageProps {
  sport: Sport;
  areas: Area[];
  user: User;
}

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 24; hour++) {
    const start = hour.toString().padStart(2, "0") + ":00";
    const end = (hour + 1).toString().padStart(2, "0") + ":00";
    slots.push({ start, end, label: `${start} - ${end}` });
  }
  return slots;
};

export default function Create() {
  const { sport, areas, user, errors } = usePage<Props>().props;

  const [form, setForm] = useState({
    customer_name: user.name || '',
    area_id: '',
    date: '',
    start_at: '',
    end_at: '',
  });

  const timeSlots = generateTimeSlots();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const time_slot =
    form.start_at && form.end_at ? `${form.start_at}-${form.end_at}` : '';

  router.post(`/sports/${sport.id}/bookings`, {
    customer_name: form.customer_name,
    area_id: form.area_id,
    date: form.date,
    time_slot,
  });
};




  return (
    <AppLayout>
      <div className="p-6 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Booking {sport.name}
          </h1>
          <Link
            href={`/sports/${sport.id}`}
            className="text-sm text-gray-500 hover:underline dark:text-gray-300"
          >
            ← Kembali
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
        >
          {/* Nama Customer */}
          <div>
            <label
              htmlFor="customer_name"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nama Customer
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="Masukkan nama customer"
            />
            {errors.customer_name && (
              <p className="mt-1 text-sm text-red-500">{errors.customer_name}</p>
            )}
          </div>

          {/* Pilih Area */}
          <div>
            <label
              htmlFor="area_id"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pilih Area
            </label>
            <select
              id="area_id"
              name="area_id"
              value={form.area_id}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value="">-- Pilih Area --</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.location} - {area.address}
                </option>
              ))}
            </select>
            {errors.area_id && (
              <p className="mt-1 text-sm text-red-500">{errors.area_id}</p>
            )}
          </div>

          {/* Pilih Tanggal */}
          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pilih Tanggal
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          {/* Pilih Jam */}
          <div>
            <label
              htmlFor="time_slot"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pilih Jam
            </label>
            <select
              id="time_slot"
              name="time_slot"
              value={form.start_at ? `${form.start_at}-${form.end_at}` : ""}
              onChange={(e) => {
                const [start, end] = e.target.value.split("-");
                setForm({ ...form, start_at: start, end_at: end });
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value="">-- Pilih Jam --</option>
              {timeSlots.map((slot, i) => (
                <option key={i} value={`${slot.start}-${slot.end}`}>
                  {slot.label}
                </option>
              ))}
            </select>
            {(errors.start_at || errors.end_at) && (
              <p className="mt-1 text-sm text-red-500">
                {errors.start_at || errors.end_at}
              </p>
            )}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md
              hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Booking Sekarang
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
