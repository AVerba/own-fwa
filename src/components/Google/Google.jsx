import styles from './Google.module.scss';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from '../../utils/mediaQuery';
import Button from 'react-bootstrap/Button';
import { ReactComponent as GoogleIcon } from '../../images/icons/GoogleIconBtn.svg';
import { useTranslation } from 'react-i18next';

export const Google = () => {
  const { t } = useTranslation();
  const Mobile = isMobile(useMediaQuery);
  return (
    <>
      <p className={Mobile ? styles.topTextMobile : styles.topTextDefault}>
        {t('firstGogleLabel')}
      </p>
      <Button className={styles.button} type="button">
        <a
          className={styles.container}
          href="https://finance-wallet.herokuapp.com/api/auth/google"
        >
          <GoogleIcon />
          <span className={styles.btnLabel}>Google</span>
        </a>
      </Button>
      <p
        className={Mobile ? styles.bottomTextMobile : styles.bottomTextDefault}
      >
        {t('secondGogleLabel')}
      </p>
    </>
  );
};
