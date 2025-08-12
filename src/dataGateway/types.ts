export interface DataDriver {
  read<T>(key: string): Promise<T | null>;
  write<T>(key: string, data: T): Promise<void>;
  delete(key: string): Promise<void>;
  list(prefix?: string): Promise<string[]>;
  exists(key: string): Promise<boolean>;
}

export interface DataGatewayConfig {
  driver: DataDriver;
  autoSave?: boolean;
  saveInterval?: number;
  schemaVersion?: string;
  enableMigrations?: boolean;
}

export interface DataSchema {
  version: string;
  lastModified: string;
  data: any;
}

export interface MigrationFunction {
  (data: any): any;
}

export interface Migration {
  version: string;
  up: MigrationFunction;
  down?: MigrationFunction;
}

export type DataKey = 
  | 'pages'
  | 'menus'
  | 'settings'
  | 'media'
  | 'templates'
  | 'myTemplates'
  | 'posts'
  | 'revisions'
  | `templates/${string}`
  | `pages/${string}`;