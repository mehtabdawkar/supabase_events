import { supabase } from '@/lib/supabaseClient';

export const revalidate = 10;

export default async function EventsPage() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, description, date, city')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true });

  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Upcoming Events</h1>

      {!data?.length && <p className="text-gray-600">No upcoming events.</p>}

      <ul className="grid gap-4 sm:grid-cols-2">
        {data?.map(e => (
          <li key={e.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-indigo-600">{e.title}</h2>
            <p className="text-sm text-gray-600">
              {new Date(e.date).toLocaleString()} · {e.city}
            </p>
            {e.description && <p className="mt-2 text-gray-700 text-sm">{e.description}</p>}

            <a
              href={`/events/${e.id}`}
              className="mt-3 inline-block px-3 py-1 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              View & RSVP
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
