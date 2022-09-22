import styles from './HomeView.module.css';

import { BackgroundImage } from '../../components/UI/BackgroundImage';
import { Background } from '../../components/UI/Background';
import { MainTitle } from '../../components/MainTitle';
import { AuthForm } from '../../components/AuthForm';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet } from '../../utils/mediaQuery';

const HomeView = () => {
  const IsMobile = isMobile(useMediaQuery);
  const IsTablet = isTablet(useMediaQuery);

  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <BackgroundImage />
      </div>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <div
        className={
          IsMobile
            ? styles.contentMobile
            : IsTablet
            ? styles.contentTablet
            : styles.contentDesktop
        }
      >
        <MainTitle />
        <AuthForm />
      </div>
    </section>
  );
};

export default HomeView;
