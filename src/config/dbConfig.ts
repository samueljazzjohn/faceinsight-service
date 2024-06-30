import mongoose, { ConnectOptions } from 'mongoose';
import data from './appConfig';

const uri: string = data.mongoDB.uri; 

const connectDatabase = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err: any) => {
      console.log("Connection error", err);
    });
};

export default connectDatabase;