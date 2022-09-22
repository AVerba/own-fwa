import styles from './LogoutButton.module.css';
import { Mobile, Default } from '../../../utils/mediaQuery';
import LogOutLogo from '../../../images/icons/logout.svg';

export const LogOutButton = () => {
  return (
    <button type="button" className={styles.button}>
      <Mobile>
        <div className={styles.btnIcon}>
          <LogOutLogo />
        </div>
        {/*<svg className={styles.btnIcon}>*/}
        {/*  <use href={`${svg}#Capa_1`} />*/}
        {/*</svg>*/}
      </Mobile>
      <Default>
        <span className={styles.label}>Logout</span>
      </Default>
    </button>
  );
};
