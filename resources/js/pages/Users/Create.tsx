import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
  const { areas } = usePage().props as any;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'employee',
    contact: '',
    address: '',
    area_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Tambah User</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Kolom 1 */}
              <div className="space-y-6">
                {(['name', 'username', 'email'] as (keyof typeof data)[]).map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 capitalize">
                      {field.replace('_', ' ')}
                    </label>
                    <input
                      id={field}
                      type="text"
                      className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={data[field]}
                      onChange={(e) => setData(field, e.target.value)}
                      autoComplete="off"
                    />
                    {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
                  </div>
                ))}

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <select
                    id="role"
                    className={`w-full rounded-md border px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                      errors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                  {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                </div>
              </div>

              {/* Kolom 2 */}
              <div className="space-y-6">
                {(['password', 'password_confirmation', 'contact', 'address'] as (keyof typeof data)[]).map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 capitalize">
                      {field.replace('_', ' ')}
                    </label>
                    <input
                      id={field}
                      type={field.includes('password') ? 'password' : 'text'}
                      className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={data[field]}
                      onChange={(e) => setData(field, e.target.value)}
                      autoComplete={field.includes('password') ? 'new-password' : 'off'}
                    />
                    {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
                  </div>
                ))}

                {/* Area, conditionally */}
                {(data.role === 'employee' || data.role === 'admin') && (
                  <div>
                    <label htmlFor="area_id" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      Area
                    </label>
                    <select
                      id="area_id"
                      className={`w-full rounded-md border px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                        errors.area_id ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={data.area_id}
                      onChange={(e) => setData('area_id', e.target.value)}
                    >
                      <option value="">Pilih Area</option>
                      {areas.map((area: any) => (
                        <option key={area.id} value={area.id}>
                          {area.location}
                        </option>
                      ))}
                    </select>
                    {errors.area_id && <p className="mt-1 text-sm text-red-500">{errors.area_id}</p>}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {processing ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
