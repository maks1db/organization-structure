import express from 'express';
import bodyParser from 'body-parser';

import { PORT } from 'shared/constants';
import * as db from './db';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(
//   '/uploads',
//   express.static(path.join(__dirname, '../../../public/uploads'))
// );
// app.use(
//   '/assets',
//   express.static(path.join(__dirname, '../../../public/assets'))
// );

app.get('/test', (req, res) => res.json({ msg: 'wow' }));

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

// app.use('', routes);
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../public/', 'index.html'));
// });

db.connect();
app.listen(PORT, () =>
  console.log(`Server organization-structure running on ${PORT}`)
);
