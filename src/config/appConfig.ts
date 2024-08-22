import dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  app: {
    port: number;
  };
}

const config: AppConfig = {
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  },
};

export default config;
