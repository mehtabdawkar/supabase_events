import { supabase } from '@/lib/supabaseClient';

type Props = { params: Promise<{ id: string }> };

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const eventId = Number(id);

  const [{ data: event }, { data: users }, { data: existing }] = await Promise.all([
    supabase.from('events').select('*').eq('id', eventId).single(),
    supabase.from('users').select('id, name').order('name', { ascending: true }),
    supabase.from('rsvps').select('user_id, status').eq('event_id', eventId),
  ]);

  if (!event) return <div className="text-red-600">Event not found.</div>;

  const rsvpMap = new Map<number, string>();
  existing?.forEach(r => rsvpMap.set(r.user_id, r.status));

  return (
    <div className="space-y-8">
      {/* Event Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">{event.title}</h1>
        <p className="text-gray-600">
          {new Date(event.date).toLocaleString()} · {event.city}
        </p>
        {event.description && <p className="mt-3 text-gray-700">{event.description}</p>}
      </div>

      {/* RSVP Form */}
      <form
        action={`/events/${id}/rsvp`}
        method="post"
        className="bg-white p-6 rounded-xl shadow-sm space-y-4"
      >
        <h2 className="text-lg font-semibold">RSVP</h2>

        <div>
          <label className="block text-sm text-gray-700">User</label>
          <select
            name="user_id"
            className="mt-1 block w-full border rounded-lg p-2 text-sm"
            required
          >
            <option value="">Select a user…</option>
            {users?.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}{rsvpMap.has(u.id) ? ` (current: ${rsvpMap.get(u.id)})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700">Status</label>
          <select
            name="status"
            className="mt-1 block w-full border rounded-lg p-2 text-sm"
            required
          >
            <option>Yes</option>
            <option>No</option>
            <option>Maybe</option>
          </select>
        </div>

        <input type="hidden" name="event_id" value={id} />

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
}
