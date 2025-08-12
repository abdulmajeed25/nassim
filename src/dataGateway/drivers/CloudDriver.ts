import { DataDriver } from '../types';

export interface CloudDriverConfig {
  provider: 'firebase' | 'supabase';
  apiKey: string;
  projectId: string;
  authDomain?: string;
  databaseURL?: string;
  storageBucket?: string;
}

export class CloudDriver implements DataDriver {
  private config: CloudDriverConfig;
  private cache: Map<string, any> = new Map();
  private isInitialized: boolean = false;

  constructor(config: CloudDriverConfig) {
    this.config = config;
  }

  private async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (this.config.provider === 'firebase') {
        await this.initializeFirebase();
      } else if (this.config.provider === 'supabase') {
        await this.initializeSupabase();
      }
      this.isInitialized = true;
      console.log(`${this.config.provider} initialized successfully`);
    } catch (error) {
      console.error(`Failed to initialize ${this.config.provider}:`, error);
      throw error;
    }
  }

  private async initializeFirebase(): Promise<void> {
    // Dynamic import to avoid loading Firebase unless needed
    const { initializeApp } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    
    const firebaseConfig = {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      projectId: this.config.projectId,
      storageBucket: this.config.storageBucket,
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Store Firebase instance for later use
    (this as any).firestore = db;
  }

  private async initializeSupabase(): Promise<void> {
    // Dynamic import to avoid loading Supabase unless needed
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = `https://${this.config.projectId}.supabase.co`;
    const supabase = createClient(supabaseUrl, this.config.apiKey);
    
    // Store Supabase instance for later use
    (this as any).supabase = supabase;
  }

  async read<T>(key: string): Promise<T | null> {
    await this.initialize();
    
    try {
      // Check cache first
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }

      let data: T | null = null;

      if (this.config.provider === 'firebase') {
        data = await this.readFromFirebase<T>(key);
      } else if (this.config.provider === 'supabase') {
        data = await this.readFromSupabase<T>(key);
      }

      if (data) {
        this.cache.set(key, data);
      }

      return data;
    } catch (error) {
      console.error(`Error reading ${key} from ${this.config.provider}:`, error);
      return null;
    }
  }

  private async readFromFirebase<T>(key: string): Promise<T | null> {
    const { doc, getDoc } = await import('firebase/firestore');
    const firestore = (this as any).firestore;
    
    const docRef = doc(firestore, 'nasim_data', key);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as T;
    }
    
    return null;
  }

  private async readFromSupabase<T>(key: string): Promise<T | null> {
    const supabase = (this as any).supabase;
    
    const { data, error } = await supabase
      .from('nasim_data')
      .select('data')
      .eq('key', key)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return null;
      }
      throw error;
    }
    
    return data?.data as T || null;
  }

  async write<T>(key: string, data: T): Promise<void> {
    await this.initialize();
    
    try {
      if (this.config.provider === 'firebase') {
        await this.writeToFirebase(key, data);
      } else if (this.config.provider === 'supabase') {
        await this.writeToSupabase(key, data);
      }

      // Update cache
      this.cache.set(key, data);
      
      console.log(`Data written to ${this.config.provider}: ${key}`);
    } catch (error) {
      console.error(`Error writing ${key} to ${this.config.provider}:`, error);
      throw error;
    }
  }

  private async writeToFirebase<T>(key: string, data: T): Promise<void> {
    const { doc, setDoc } = await import('firebase/firestore');
    const firestore = (this as any).firestore;
    
    const docRef = doc(firestore, 'nasim_data', key);
    await setDoc(docRef, data as any, { merge: true });
  }

  private async writeToSupabase<T>(key: string, data: T): Promise<void> {
    const supabase = (this as any).supabase;
    
    const { error } = await supabase
      .from('nasim_data')
      .upsert({
        key,
        data,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    await this.initialize();
    
    try {
      if (this.config.provider === 'firebase') {
        await this.deleteFromFirebase(key);
      } else if (this.config.provider === 'supabase') {
        await this.deleteFromSupabase(key);
      }

      // Remove from cache
      this.cache.delete(key);
      
      console.log(`Data deleted from ${this.config.provider}: ${key}`);
    } catch (error) {
      console.error(`Error deleting ${key} from ${this.config.provider}:`, error);
      throw error;
    }
  }

  private async deleteFromFirebase(key: string): Promise<void> {
    const { doc, deleteDoc } = await import('firebase/firestore');
    const firestore = (this as any).firestore;
    
    const docRef = doc(firestore, 'nasim_data', key);
    await deleteDoc(docRef);
  }

  private async deleteFromSupabase(key: string): Promise<void> {
    const supabase = (this as any).supabase;
    
    const { error } = await supabase
      .from('nasim_data')
      .delete()
      .eq('key', key);
    
    if (error) {
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    await this.initialize();
    
    try {
      // Check cache first
      if (this.cache.has(key)) {
        return true;
      }

      if (this.config.provider === 'firebase') {
        return await this.existsInFirebase(key);
      } else if (this.config.provider === 'supabase') {
        return await this.existsInSupabase(key);
      }

      return false;
    } catch (error) {
      console.error(`Error checking existence of ${key}:`, error);
      return false;
    }
  }

  private async existsInFirebase(key: string): Promise<boolean> {
    const { doc, getDoc } = await import('firebase/firestore');
    const firestore = (this as any).firestore;
    
    const docRef = doc(firestore, 'nasim_data', key);
    const docSnap = await getDoc(docRef);
    
    return docSnap.exists();
  }

  private async existsInSupabase(key: string): Promise<boolean> {
    const supabase = (this as any).supabase;
    
    const { data, error } = await supabase
      .from('nasim_data')
      .select('key')
      .eq('key', key)
      .single();
    
    return !error && !!data;
  }

  async list(prefix?: string): Promise<string[]> {
    await this.initialize();
    
    try {
      if (this.config.provider === 'firebase') {
        return await this.listFromFirebase(prefix);
      } else if (this.config.provider === 'supabase') {
        return await this.listFromSupabase(prefix);
      }

      return [];
    } catch (error) {
      console.error(`Error listing keys from ${this.config.provider}:`, error);
      return [];
    }
  }

  private async listFromFirebase(prefix?: string): Promise<string[]> {
    const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
    const firestore = (this as any).firestore;
    
    let q = query(collection(firestore, 'nasim_data'), orderBy('__name__'));
    
    if (prefix) {
      q = query(q, 
        where('__name__', '>=', prefix),
        where('__name__', '<', prefix + '\uf8ff')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.id);
  }

  private async listFromSupabase(prefix?: string): Promise<string[]> {
    const supabase = (this as any).supabase;
    
    let query = supabase
      .from('nasim_data')
      .select('key')
      .order('key');
    
    if (prefix) {
      query = query.like('key', `${prefix}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data?.map((item: any) => item.key) || [];
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}