import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { IconSvg } from '../IconSvg';
import svgSprite from '../../../images/sprite.svg';
import { isMobile } from '../../../utils/mediaQuery';
import styles from './GoBackButton.module.scss';

export const GoBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [from, setFrom] = useState();

  const Mobile = isMobile(useMediaQuery);

  useEffect(() => {
    if (location?.state?.from) {
      setFrom(location?.state?.from);
    }
  }, [location?.state?.from]);

  return (
    <button
      className={styles.btn}
      type="button"
      onClick={() => navigate(from ?? '/')}
    >
      <div className={styles.wrapper}>
        <IconSvg sprite={svgSprite} icon="go_back" className={styles.icon} />
        {!Mobile && <p className={styles.label}>{t('goBackBtn')}</p>}
      </div>
    </button>
  );
};
