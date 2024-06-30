import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import connectDB from './config/dbConfig'
import bodyParser from 'body-parser';
import envData from './config/appConfig'

const app = express();

connectDB();

app.use(cors({
  origin: ['*'],
  credentials: true,
}));

import indexRouter from './router/index';


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/v1', indexRouter);


app.listen(envData.app.port, () => {
  console.log(`Server listening on port ${envData.app.port}`);
});

