
import { CacheService as ICacheService } from '../../domain/services/cacheService';

interface StorageValue {
    storedAt: number,
    value: string;
}

export class CacheService implements ICacheService {
    private expirationTime = 86400000;

    constructor(expirationTime?: number) {
        if (expirationTime != null && Number.isFinite(expirationTime)) {
            this.expirationTime = expirationTime;
        }
    }

    save(key: string, value: string): void {
        const data: StorageValue = {
            storedAt: new Date().getTime(),
            value,
        };
        localStorage.setItem(key, JSON.stringify(data));
    }

    get(key: string): string | null {
        const dataStr = localStorage.getItem(key);
        if (dataStr) {
            const data: StorageValue = JSON.parse(dataStr);
            if (Date.now() - data.storedAt < this.expirationTime) {
                return data.value;
            }
        }
        return null;
    }

}