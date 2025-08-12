import { DataDriver, DataGatewayConfig, DataSchema, DataKey } from './types';
import { runMigrations } from './migrations';

export class DataGateway {
  private driver: DataDriver;
  private autoSave: boolean;
  private saveInterval: number;
  private schemaVersion: string;
  private enableMigrations: boolean;
  private saveTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private cache: Map<string, any> = new Map();

  constructor(config: DataGatewayConfig) {
    this.driver = config.driver;
    this.autoSave = config.autoSave ?? true;
    this.saveInterval = config.saveInterval ?? 1000; // 1 second
    this.schemaVersion = config.schemaVersion ?? '1.0.0';
    this.enableMigrations = config.enableMigrations ?? true;
  }

  async read<T>(key: DataKey): Promise<T | null> {
    try {
      // Check cache first
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }

      const schema = await this.driver.read<DataSchema>(key);
      if (!schema) return null;

      let data = schema.data;

      // Run migrations if enabled
      if (this.enableMigrations && schema.version !== this.schemaVersion) {
        data = await runMigrations(data, schema.version, this.schemaVersion);
        // Update schema version
        await this.write(key, data);
      }

      // Cache the data
      this.cache.set(key, data);
      return data;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  }

  async write<T>(key: DataKey, data: T): Promise<void> {
    try {
      const schema: DataSchema = {
        version: this.schemaVersion,
        lastModified: new Date().toISOString(),
        data
      };

      // Update cache
      this.cache.set(key, data);

      if (this.autoSave) {
        // Clear existing timeout
        const existingTimeout = this.saveTimeouts.get(key);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }

        // Set new timeout
        const timeout = setTimeout(async () => {
          await this.driver.write(key, schema);
          this.saveTimeouts.delete(key);
          console.log(`Auto-saved ${key}`);
        }, this.saveInterval);

        this.saveTimeouts.set(key, timeout);
      } else {
        await this.driver.write(key, schema);
      }
    } catch (error) {
      console.error(`Error writing ${key}:`, error);
      throw error;
    }
  }

  async delete(key: DataKey): Promise<void> {
    try {
      // Clear cache
      this.cache.delete(key);
      
      // Clear any pending save
      const timeout = this.saveTimeouts.get(key);
      if (timeout) {
        clearTimeout(timeout);
        this.saveTimeouts.delete(key);
      }

      await this.driver.delete(key);
    } catch (error) {
      console.error(`Error deleting ${key}:`, error);
      throw error;
    }
  }

  async exists(key: DataKey): Promise<boolean> {
    try {
      return await this.driver.exists(key);
    } catch (error) {
      console.error(`Error checking existence of ${key}:`, error);
      return false;
    }
  }

  async list(prefix?: string): Promise<string[]> {
    try {
      return await this.driver.list(prefix);
    } catch (error) {
      console.error(`Error listing keys:`, error);
      return [];
    }
  }

  async flush(): Promise<void> {
    // Force save all pending writes
    const promises = Array.from(this.saveTimeouts.entries()).map(async ([key, timeout]) => {
      clearTimeout(timeout);
      const data = this.cache.get(key);
      if (data) {
        const schema: DataSchema = {
          version: this.schemaVersion,
          lastModified: new Date().toISOString(),
          data
        };
        await this.driver.write(key as DataKey, schema);
      }
    });

    await Promise.all(promises);
    this.saveTimeouts.clear();
    console.log('All data flushed to storage');
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}