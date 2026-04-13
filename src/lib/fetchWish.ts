import { Storage } from '@lib/storage';

const WISHES_INDEX_URL =
  'https://raw.githubusercontent.com/RajnishKMehta/Scream2Wish-wishes/refs/heads/main/wishes/index.json';

const WISH_BASE_URL =
  'https://raw.githubusercontent.com/RajnishKMehta/Scream2Wish-wishes/refs/heads/main/wishes';

interface WishData {
  wish: string;
  note: string;
  from: string;
  at: number;
}

export async function fetchAndStoreRandomWish(): Promise<void> {
  try {
    const indexRes = await fetch(WISHES_INDEX_URL);
    if (!indexRes.ok) return;

    const ids: string[] = await indexRes.json();
    if (!Array.isArray(ids) || ids.length === 0) return;

    const randomId = ids[Math.floor(Math.random() * ids.length)];
    if (!randomId) return;

    const wishRes = await fetch(`${WISH_BASE_URL}/${randomId}.json`);
    if (!wishRes.ok) return;

    const data: WishData = await wishRes.json();

    Storage.set('rnote', data.note ?? '');
    Storage.set('rnotefrom', data.from ?? '');
    Storage.set('rnoteat', String(data.at ?? 0));
  } catch {
    // silently fail — this is a background operation
  }
}
