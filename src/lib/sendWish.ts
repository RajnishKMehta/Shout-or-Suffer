import { Storage } from '@lib/storage';

const WISH_WORKER_URL: string =
  (process.env.EXPO_PUBLIC_WISH_WORKER_URL as string | undefined) ??
  'https://scream2wish.rajnishkmehta.workers.dev';

const WISH_WORKER_API: string =
  (process.env.EXPO_PUBLIC_WISH_WORKER_API as string | undefined) ?? '';

export async function trySendWish(): Promise<void> {
  try {
    const issent = Storage.getBoolean('issent');
    if (issent === true) return;

    const wish = Storage.getString('mywish');
    const note = Storage.getString('mynote');
    const from = Storage.getString('name');

    if (!wish || !wish.trim() || !note || !note.trim() || !from || !from.trim()) return;

    const res = await fetch(WISH_WORKER_URL, {
      method: 'POST',
      headers: {
        'x-api-key': WISH_WORKER_API,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'add-wish',
        client_payload: {
          wish: wish.trim(),
          note: note.trim(),
          from: from.trim(),
        },
      }),
    });

    if (res.status === 200 || res.status === 201) {
      Storage.set('issent', true);
    }
  } catch {
    // silently fail — will retry on next app open
  }
}
