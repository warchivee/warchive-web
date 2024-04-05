import RecoverableError from 'src/types/error/RecoverableError';
import UnrecoverableError from 'src/types/error/UnrecoverableError';

const DB_KEY = 'warchive-web';
const DB_VERSION = 1;

export const WATA_STORE = 'wata-store';
export const KEYWORD_STORE = 'keyword-store';
export const COLLECTION_STORE = 'collection-store';

class IndexedDBUtil {
  private static instance: IndexedDBUtil;

  private db: IDBDatabase | null = null;

  public static getInstance() {
    if (!IndexedDBUtil.instance) {
      IndexedDBUtil.instance = new IndexedDBUtil();
    }

    return IndexedDBUtil.instance;
  }

  public async openDB(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const factory = window.indexedDB;

      if (!factory) {
        reject(
          new RecoverableError(
            '해당 브라우저에서는 indexedDB를 지원하지 않습니다. 다른 브라우저로 접속해주세요.',
          ),
        );
      }

      if (this.db) {
        resolve(this.db);
      }

      const request = factory.open(DB_KEY, DB_VERSION);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new UnrecoverableError('Failed to open IndexedDB'));
      };

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(WATA_STORE)) {
          db.createObjectStore(WATA_STORE, {
            keyPath: 'id',
          });
        }

        if (!db.objectStoreNames.contains(KEYWORD_STORE)) {
          db.createObjectStore(KEYWORD_STORE, {
            keyPath: 'id',
          });
        }

        if (!db.objectStoreNames.contains(COLLECTION_STORE)) {
          db.createObjectStore(COLLECTION_STORE, {
            keyPath: 'id',
          });
        }
      };
    });
  }

  public getItems = async <T>(storeName: string): Promise<T> => {
    if (!this.db) {
      this.db = await this.openDB();
    }

    const transaction = this.db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    return new Promise<T>((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result as T);
      };

      request.onerror = () => {
        console.error('Failed to add item:', request.error);
        reject(request.error);
      };
    });
  };

  public addItem = async <T>(storeName: string, item: T): Promise<void> => {
    if (!this.db) {
      this.db = await this.openDB();
    }

    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    return new Promise<void>((resolve, reject) => {
      const request = store.add(item as T);
      request.onerror = () => {
        console.error('Failed to add item:', request.error);
        reject(request.error);
      };
      request.onsuccess = () => resolve();
    });
  };

  public updateItem = async <T>(storeName: string, item: T): Promise<void> => {
    if (!this.db) {
      this.db = await this.openDB();
    }

    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    return new Promise<void>((resolve, reject) => {
      const request = store.put(item);
      request.onerror = () => {
        console.error('Failed to update item:', request.error);
        reject(request.error);
      };
      request.onsuccess = () => resolve();
    });
  };

  public deleteItem = async (storeName: string, id: number): Promise<void> => {
    if (!this.db) {
      this.db = await this.openDB();
    }

    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    return new Promise<void>((resolve, reject) => {
      const request = store.delete(id);
      request.onerror = () => {
        console.error('Failed to delete item:', request.error);
        reject(request.error);
      };
      request.onsuccess = () => resolve();
    });
  };

  public clearStore = async (storeName: string): Promise<void> => {
    if (!this.db) {
      this.db = await this.openDB();
    }

    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    return new Promise<void>((resolve, reject) => {
      const request = store.clear();

      request.onerror = () => {
        console.error('Failed to delete item:', request.error);
        reject(request.error);
      };

      transaction.oncomplete = () => {
        resolve();
      };
    });
  };
}

export default IndexedDBUtil;
