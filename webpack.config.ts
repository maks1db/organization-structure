import { merge } from 'webpack-merge';

import { common, dev, prod } from './utils/webpack';

const isDevelopment = process.env.NODE_ENV === 'development';

export default merge(common, isDevelopment ? dev : prod);
