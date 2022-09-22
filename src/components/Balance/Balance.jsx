import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/operation';
import { ReactComponent as Diagram } from '../../images/icons/Diagram.svg';
import s from './Balance.module.scss';
import { BalanceInput } from './BalanceInput/BalanceInput';
import { useTranslation } from 'react-i18next';

export const Balance = () => {
  const { t } = useTranslation();
  const getBalance = useSelector(authSelectors.getBalance);

  return (
    <>
      <div className={s.formContainer}>
        <div
          className={s.reportContainer}
          style={getBalance === null ? { pointerEvents: 'none' } : {}}
        >
          <a href="reports" className={s.reportLink} type="button">
            {t('reportsTab')}
            <Diagram className={s.reportSvg} />
          </a>
        </div>
        <BalanceInput />
      </div>
    </>
  );
};
