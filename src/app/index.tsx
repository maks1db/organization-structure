import { render } from 'react-dom';

import styles from './style.module.scss'

render(
    <h1 className={styles.info}>App ready</h1>,
    document.getElementById('root'),
);
