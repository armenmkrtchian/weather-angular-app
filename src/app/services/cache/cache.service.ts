import { Injectable } from '@angular/core';
import { Weather } from '../../interfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, { data: Weather; expiry: number }> = new Map();

  setCache(key: string, data: Weather, expiryTime: number = 3600000): void {
    const expiry = Date.now() + expiryTime;
    this.cache.set(key, { data, expiry });
  }

  getCache(key: string): Weather | null {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    } else {
      this.cache.delete(key);
      return null;
    }
  }

  clearCache(key: string): void {
    this.cache.delete(key);
  }

  clearAllCache(): void {
    this.cache.clear();
  }
}
