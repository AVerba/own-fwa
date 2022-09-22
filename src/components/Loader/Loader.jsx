import styles from './Loader.module.css';
import { ReactComponent as KapustaLoader } from '../../images/loader.svg';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <KapustaLoader className={styles.loader} />
    </div>
  );
};
