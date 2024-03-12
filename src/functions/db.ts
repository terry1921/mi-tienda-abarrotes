import { openDB } from 'idb';

const DATABASE_NAME = 'pwaDatabase';
const STORE_NAME = 'failedRequests';
const VERSION = 1;

async function getDb() {
    return openDB(DATABASE_NAME, VERSION, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME, { autoIncrement: true });
        },
    });
}

export async function saveFailedRequest(url: string, method: string = 'GET', body: any = null) {
    const db = await getDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.add({ url, method, body }); // Guarda un objeto simple
    await tx.done;
}

export async function getAndClearFailedRequests(): Promise<{ url: string; method: string; body: any }[]> {
    const db = await getDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const requests = await store.getAll();
    await store.clear();
    await tx.done;
    return requests;
}