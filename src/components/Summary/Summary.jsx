import styles from './Summary.module.scss';
import { isMobile } from '../../utils/mediaQuery';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/operation';
import { useLocation } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { formatSum } from '../../utils/formSum';
import { month } from '../../utils/month';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const MONTH_LIST = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december',
};

export const Summary = () => {
  const { t } = useTranslation();
  const getBalance = useSelector(authSelectors.getBalance);
  const IsMobile = isMobile(useMediaQuery);
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState([]);
  const type = location.pathname.slice(1);

  useEffect(() => {
    dispatch(authOperations.getTransactionsByMonth({ type }))
      .then(response => {
        const { transactions } = response.payload;
        setData(transactions);
        dispatch(authOperations.fetchCurrentUser())
          .unwrap()
          .catch(() => {
            Notify.warning(
              'Sorry, your authorization token expired, please re-login',
              {}
            );
            dispatch(authOperations.logOut());
          });
      })
      .catch(error => {
        Notify.failure(`${error.message}`);
      });
  }, [type, getBalance]);

  const dataList = data
    .sort((x, y) => parseInt(y._id.month) - parseInt(x._id.month))
    .slice(0, 6);

  return (
    <div className={IsMobile ? styles.mobContainer : styles.container}>
      <h4 className={styles.title}>{t('summary').toUpperCase()} </h4>
      <ul className={styles.list}>
        {getBalance === null && (
          <li className={styles.firstMessage}>
            {t('summaryFirstNotify').toUpperCase()}
          </li>
        )}
        {dataList.length === 0 && getBalance !== null && (
          <li className={styles.noTransactions}>
            {t('summaryNoTransactions')}
          </li>
        )}
        {dataList.map(({ _id, total }) => (
          <li key={nanoid()} className={styles.item}>
            <span>{t(MONTH_LIST[parseInt(_id.month)])}</span>
            <span>
              {formatSum(total)} {t('hrn').toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
