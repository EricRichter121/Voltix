export interface AppConfig {
    port: number;
    env: 'development' | 'production';
}

export const config: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  env: (process.env.NODE_ENV === 'production' ? 'production' : 'development'),
};