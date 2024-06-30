import dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  app: {
    port: number;
  };
  mongoDB: {
    uri: string;
  };
}

const config: AppConfig = {
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  },
  mongoDB: {
    uri: process.env.MONGODB_URI || '',
  },
};

export default config;
