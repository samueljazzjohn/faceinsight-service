import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import envData from './config/appConfig'

const app = express();

app.use(cors({
  origin: ['*','https://app.localhost','https://faceinsight-dashboard.vercel.app','https://93c5-59-89-204-90.ngrok-free.app'],
  credentials: false,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routers
import indexRouter from './router/index';
import facebookRouter from './router/facebook';

// Set up routes
app.use('/v1', indexRouter);
app.use('/v1/facebook', facebookRouter);

// Start the server
app.listen(envData.app.port, () => {
  console.log(`Server listening on port ${envData.app.port}`);
});