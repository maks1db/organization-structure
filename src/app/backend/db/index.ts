import mongoose from 'mongoose';

// TODO: Разделить конфиг на dev/prod
const connectionString = 'mongodb://localhost:27017/org-structure';

let timeout: NodeJS.Timeout;
const RETRY_TIMEOUT = 10000;

const { log, error } = console;

export const connect = () => {
  mongoose.connect(connectionString).then(() => {
    log('Connect to database...');
  });
};
export const disconnect = () => {
  clearTimeout(timeout);
  mongoose.disconnect();
};

mongoose.connection.on('error', err => {
  timeout = setTimeout(() => {
    error(err);
    disconnect();
    connect();
  }, RETRY_TIMEOUT);
});
