import styles from './MainTitle.module.css';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet } from '../../utils/mediaQuery';

export const MainTitle = () => {
  const Mobile = isMobile(useMediaQuery);
  const Tablet = isTablet(useMediaQuery);

  return (
    <div
      className={
        Mobile ? styles.mobile : Tablet ? styles.tablet : styles.desktop
      }
    >
      <h1
        className={
          Mobile
            ? styles.mobileTitle
            : Tablet
            ? styles.tabletTitle
            : styles.desktopTitle
        }
      >
        Kapu
        <span
          className={
            Mobile ? styles.mobileS : Tablet ? styles.tabletS : styles.desktopS
          }
        >
          s
        </span>
        ta
      </h1>
      <p
        className={
          Mobile
            ? styles.mobileSubTitle
            : Tablet
            ? styles.tabletSubTitle
            : styles.desktopSubTitle
        }
      >
        smart finance
      </p>
    </div>
  );
};
