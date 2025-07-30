import { useForm } from '@inertiajs/react';

export default function AreaForm({ area = null }: { area?: any }) {
  const { data, setData, post, put, processing, errors } = useForm({
    location: area?.location || '',
    address: area?.address || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    area ? put(`/areas/${area.id}`) : post('/areas');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Location</label>
        <input value={data.location} onChange={e => setData('location', e.target.value)} />
        {errors.location && <div className="text-red-500">{errors.location}</div>}
      </div>

      <div>
        <label>Address</label>
        <input value={data.address} onChange={e => setData('address', e.target.value)} />
        {errors.address && <div className="text-red-500">{errors.address}</div>}
      </div>

      <button type="submit" disabled={processing} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        {area ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
