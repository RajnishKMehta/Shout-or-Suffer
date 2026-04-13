import { Storage } from '@lib/storage';

const WISH_WORKER_URL: string =
  (process.env.EXPO_PUBLIC_WISH_WORKER_URL as string | undefined) ??
  'https://scream2wish.rajnishkmehta.workers.dev';

const WISH_WORKER_API: string =
  (process.env.EXPO_PUBLIC_WISH_WORKER_API as string | undefined) ?? '';

export async function trySendWish(): Promise<void> {
  try {
    const issent = Storage.getString('issent');
    if (issent === '1') return;

    const wish = Storage.getString('mywish');
    if (!wish) return;

    const note = Storage.getString('mynote') ?? '';
    const from = Storage.getString('name') ?? '';

    const res = await fetch(WISH_WORKER_URL, {
      method: 'POST',
      headers: {
        'x-api-key': WISH_WORKER_API,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'add-wish',
        client_payload: { wish, note, from },
      }),
    });

    if (res.status === 200 || res.status === 201) {
      Storage.set('issent', '1');
    }
  } catch {
    // silently fail — will retry on next app open
  }
}
