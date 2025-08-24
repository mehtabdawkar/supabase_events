import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const form = await req.formData();
  const user_id = Number(form.get('user_id'));
  const event_id = Number(form.get('event_id'));
  const status = String(form.get('status'));

  if (!user_id || !event_id || !['Yes','No','Maybe'].includes(status)) {
    return NextResponse.redirect(new URL(`/events/${params.id}?error=invalid`, req.url));
  }

  // Upsert: if the (user_id, event_id) pair exists, update; else insert
  const { error } = await supabase
    .from('rsvps')
    .upsert({ user_id, event_id, status }, { onConflict: 'user_id,event_id' });

  const url = new URL(`/events/${params.id}`, req.url);
  if (error) url.searchParams.set('error', error.message);
  else url.searchParams.set('ok', '1');
  return NextResponse.redirect(url);
}
