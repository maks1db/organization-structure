import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { PORT } from 'shared/constants';
import * as db from './db';
import { router } from './routes/v1';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      return res.send(200);
    }
    return next();
  });
}

app.use('/api', router);
app.use(express.static(path.resolve(__dirname, '../../public/')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/', 'index.html'));
});

db.connect();
app.listen(PORT, () =>
  console.log(`Server organization-structure running on ${PORT}`)
);
