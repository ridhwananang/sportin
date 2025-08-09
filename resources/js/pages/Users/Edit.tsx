import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Edit() {
  const { user, areas } = usePage().props as any;

  const { data, setData, put, processing, errors } = useForm({
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    role: user.role || '',
    contact: user.contact || '',
    address: user.address || '',
    area_id: user.employee?.area_id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('users.update', user.id));
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
         {(['name', 'username', 'email', 'contact', 'address'] as (keyof typeof data)[]).map((field) => (

            <div key={field}>
              <label className="block capitalize">{field.replace('_', ' ')}</label>
              <input
                type="text"
                className="w-full border px-3 py-2"
                value={data[field]}
                onChange={(e) => setData(field, e.target.value)}
              />
              {errors[field] && <div className="text-red-500 text-sm">{errors[field]}</div>}
            </div>
          ))}

          <div>
            <label className="block">Role</label>
            <select
              className="w-full border px-3 py-2"
              value={data.role}
              onChange={(e) => setData('role', e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="super_admin">Super Admin</option>
            </select>
            {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
          </div>

          {(data.role === 'employee' || data.role === 'admin') && (
            <div>
              <label className="block">Area</label>
              <select
                className="w-full border px-3 py-2"
                value={data.area_id}
                onChange={(e) => setData('area_id', e.target.value)}
              >
                <option value="">Pilih Area</option>
                {areas.map((area: any) => (
                  <option key={area.id} value={area.id}>{area.location}</option>
                ))}
              </select>
              {errors.area_id && <div className="text-red-500 text-sm">{errors.area_id}</div>}
            </div>
          )}

          <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
