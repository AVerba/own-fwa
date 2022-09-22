import styles from './BackgroundImage.module.css';
import { Mobile, Tablet, Desktop } from '../../../utils/mediaQuery';
import { ReactComponent as TopDecor } from '../../../images/deskDecor.svg';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../../redux/operation';

export const BackgroundImage = () => {
  const isLogin = useSelector(authSelectors.getIsLoggedIn);
  return (
    <div>
      <Mobile>
        <div className={styles.mobTop}></div>
      </Mobile>
      <Tablet>
        {isLogin ? null : <div className={styles.tabletTop}></div>}
        {/*<div className={styles.tabletTop}></div>*/}
        {isLogin ? (
          <div className={styles.tableBottomLogin}></div>
        ) : (
          <div className={styles.tabletBottom}></div>
        )}
      </Tablet>
      <Desktop>
        {isLogin ? (
          <div className={styles.deskTopLogin}></div>
        ) : (
          <div className={styles.deskTop}></div>
        )}
        {isLogin ? (
          <div className={styles.deskBottomLogin}></div>
        ) : (
          <div className={styles.deskBottom}></div>
        )}
      </Desktop>
    </div>
  );
};
