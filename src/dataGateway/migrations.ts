import { Migration } from './types';

// Migration registry
const migrations: Migration[] = [
  {
    version: '1.0.1',
    up: (data: any) => {
      // Add new fields to settings
      if (data.settings) {
        data.settings.designTokens = data.settings.designTokens || {
          colors: {
            primary: '#3B82F6',
            secondary: '#10B981',
            accent: '#F59E0B',
            neutral: '#6B7280'
          },
          typography: {
            fontFamily: 'Cairo, sans-serif',
            scale: {
              xs: '0.75rem',
              sm: '0.875rem',
              base: '1rem',
              lg: '1.125rem',
              xl: '1.25rem',
              '2xl': '1.5rem',
              '3xl': '1.875rem',
              '4xl': '2.25rem'
            }
          },
          spacing: {
            scale: 1,
            unit: 'rem'
          },
          borders: {
            radius: {
              none: '0',
              sm: '0.125rem',
              md: '0.375rem',
              lg: '0.5rem',
              xl: '0.75rem',
              full: '9999px'
            },
            width: {
              thin: '1px',
              medium: '2px',
              thick: '4px'
            }
          },
          shadows: {
            sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
          }
        };
      }
      return data;
    }
  },
  {
    version: '1.1.0',
    up: (data: any) => {
      // Add template system
      if (!data.templates) {
        data.templates = [];
      }
      if (!data.myTemplates) {
        data.myTemplates = [];
      }
      return data;
    }
  },
  {
    version: '1.2.0',
    up: (data: any) => {
      // Add revision system
      if (!data.revisions) {
        data.revisions = {};
      }
      return data;
    }
  },
  {
    version: '1.3.0',
    up: (data: any) => {
      // Add AI builder settings
      if (data.settings) {
        data.settings.aiBuilder = data.settings.aiBuilder || {
          enabled: true,
          provider: 'openai',
          model: 'gpt-4',
          maxTokens: 2000,
          temperature: 0.7,
          language: 'ar',
          businessContext: {
            industry: 'AC Maintenance',
            services: ['صيانة المكيفات', 'تنظيف المكيفات', 'إصلاح التسريب', 'شحن الفريون'],
            targetAudience: 'أصحاب المنازل والشركات في السعودية',
            tone: 'professional',
            cta: ['اتصل الآن', 'واتساب', 'احجز موعد']
          }
        };
      }
      return data;
    }
  }
];

export async function runMigrations(
  data: any,
  fromVersion: string,
  toVersion: string
): Promise<any> {
  console.log(`Running migrations from ${fromVersion} to ${toVersion}`);
  
  // Find migrations to run
  const migrationsToRun = migrations.filter(migration => {
    return compareVersions(migration.version, fromVersion) > 0 &&
           compareVersions(migration.version, toVersion) <= 0;
  });

  // Sort migrations by version
  migrationsToRun.sort((a, b) => compareVersions(a.version, b.version));

  // Run migrations
  let migratedData = { ...data };
  for (const migration of migrationsToRun) {
    console.log(`Applying migration ${migration.version}`);
    try {
      migratedData = migration.up(migratedData);
    } catch (error) {
      console.error(`Migration ${migration.version} failed:`, error);
      throw error;
    }
  }

  console.log(`Migrations completed. Applied ${migrationsToRun.length} migrations.`);
  return migratedData;
}

export function compareVersions(a: string, b: string): number {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);
  
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] || 0;
    const bPart = bParts[i] || 0;
    
    if (aPart > bPart) return 1;
    if (aPart < bPart) return -1;
  }
  
  return 0;
}

export function getLatestVersion(): string {
  if (migrations.length === 0) return '1.0.0';
  return migrations[migrations.length - 1].version;
}