import { DataDriver } from '../types';

export class LocalJsonDriver implements DataDriver {
  private baseUrl: string;
  private cache: Map<string, any> = new Map();

  constructor(baseUrl: string = '/data') {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  async read<T>(key: string): Promise<T | null> {
    try {
      // Check cache first
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }

      const response = await fetch(`${this.baseUrl}/${key}.json`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the data
      this.cache.set(key, data);
      return data;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  }

  async write<T>(key: string, data: T): Promise<void> {
    try {
      // In a real app, this would write to a backend API
      // For now, we'll store in localStorage and cache
      const jsonData = JSON.stringify(data, null, 2);
      
      // Store in localStorage as backup
      localStorage.setItem(`nasim_${key}`, jsonData);
      
      // Update cache
      this.cache.set(key, data);
      
      // In development, we could also write to the file system
      // using a development server endpoint
      if (process.env.NODE_ENV === 'development') {
        try {
          await fetch('/api/write-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key, data })
          });
        } catch (devError) {
          console.warn('Development write failed, using localStorage only:', devError);
        }
      }
      
      console.log(`Data written to ${key}`);
    } catch (error) {
      console.error(`Error writing ${key}:`, error);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      // Remove from cache
      this.cache.delete(key);
      
      // Remove from localStorage
      localStorage.removeItem(`nasim_${key}`);
      
      // In development, delete from file system
      if (process.env.NODE_ENV === 'development') {
        try {
          await fetch('/api/delete-data', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key })
          });
        } catch (devError) {
          console.warn('Development delete failed:', devError);
        }
      }
      
      console.log(`Data deleted: ${key}`);
    } catch (error) {
      console.error(`Error deleting ${key}:`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      // Check cache first
      if (this.cache.has(key)) {
        return true;
      }

      // Check localStorage
      if (localStorage.getItem(`nasim_${key}`)) {
        return true;
      }

      // Check remote file
      const response = await fetch(`${this.baseUrl}/${key}.json`, {
        method: 'HEAD'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async list(prefix?: string): Promise<string[]> {
    try {
      // Get from localStorage
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('nasim_')) {
          const dataKey = key.replace('nasim_', '');
          if (!prefix || dataKey.startsWith(prefix)) {
            keys.push(dataKey);
          }
        }
      }

      // Add cache keys
      for (const key of this.cache.keys()) {
        if (!prefix || key.startsWith(prefix)) {
          if (!keys.includes(key)) {
            keys.push(key);
          }
        }
      }

      return keys.sort();
    } catch (error) {
      console.error('Error listing keys:', error);
      return [];
    }
  }

  // Additional methods for local driver
  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  // Load data from localStorage on initialization
  async loadFromLocalStorage(): Promise<void> {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('nasim_')) {
          const dataKey = key.replace('nasim_', '');
          const data = localStorage.getItem(key);
          if (data) {
            try {
              const parsedData = JSON.parse(data);
              this.cache.set(dataKey, parsedData);
            } catch (parseError) {
              console.warn(`Failed to parse localStorage data for ${dataKey}:`, parseError);
            }
          }
        }
      }
      console.log(`Loaded ${this.cache.size} items from localStorage`);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
}