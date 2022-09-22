import styles from './Background.module.css';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet } from '../../../utils/mediaQuery';

export const Background = () => {
  const IsMobile = isMobile(useMediaQuery);
  const IsTablet = isTablet(useMediaQuery);
  return (
    <section
      className={
        IsMobile ? styles.mobile : IsTablet ? styles.tablet : styles.desktop
      }
    />
  );
};
