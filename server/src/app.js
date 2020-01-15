import 'dotenv/config';

import Youch from 'youch';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

// Uncomment this line to enable database access
// --------
// import './database';

mongoose.connect(
  'mongodb://andre:andre123@cluster0-shard-00-00-kbv9a.mongodb.net:27017,cluster0-shard-00-01-kbv9a.mongodb.net:27017,cluster0-shard-00-02-kbv9a.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
