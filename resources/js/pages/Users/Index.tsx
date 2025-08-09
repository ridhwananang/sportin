import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { PageProps } from '@/types';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  contact?: string;
  address?: string;
  employee?: {
    area?: {
      location: string;
    }
  };
}

export default function Index() {
  const { users } = usePage<PageProps & { users: User[] }>().props;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const confirmDelete = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      router.delete(route('users.destroy', selectedUser.id), {
        onFinish: () => {
          setShowModal(false);
          setSelectedUser(null);
        },
      });
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Daftar User</h1>
        <Link href={route('users.create')} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Tambah User
        </Link>

        <table className="w-full table-auto mt-6 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Area</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id}>
                <td className="border px-4 py-2 text-center">{i + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2">
                  {user.employee?.area?.location ?? '-'}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link href={route('users.edit', user.id)} className="text-blue-500 mr-2">Edit</Link>
                  <button onClick={() => confirmDelete(user)} className="text-red-600">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ConfirmDeleteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          itemName={selectedUser?.name ?? ''}
        />
      </div>
    </AppLayout>
  );
}
