import dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  app: {
    port: number;
  };
  mongoDB: {
    uri: string;
  };
  facebook:{
    appId: string;
    appSecret: string;
    authUrl: string
  },
  secret:{
    key: string
  }
}

const config: AppConfig = {
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  },
  mongoDB: {
    uri: process.env.MONGODB_URI || '',
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID || '',
    appSecret: process.env.FACEBOOK_APP_SECRET || '',
    authUrl: process.env.FACEBOOK_AUTH_URL || ''
  },
  secret: {
    key: process.env.SECRET_API_KEY || ''
  }
};

export default config;
