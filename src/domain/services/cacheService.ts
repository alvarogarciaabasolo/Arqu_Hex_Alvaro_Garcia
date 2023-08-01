
export interface CacheService {
    save(key: string, value: string): void;
    get(key: string): string | null;
}