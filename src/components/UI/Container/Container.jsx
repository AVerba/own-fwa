import styles from './Container.module.scss';

const Container = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Container;
