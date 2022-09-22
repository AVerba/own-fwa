import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authOperations, authSelectors } from '../../../redux/operation';
import Transaction from './Transaction';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { commonDate } from '../../../utils/date';
import styles from './TableMobile.module.scss';
import GlobalContext from '../../../context/GlobalContext';
import { useTranslation } from 'react-i18next';

export default function TableMobile() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  const location = useLocation();
  const getBalance = useSelector(authSelectors.getBalance);
  const type = location.pathname.slice(1);
  const { daySelected } = useContext(GlobalContext);

  useEffect(() => {
    const date = commonDate(daySelected);

    const params = {
      day: date.day,
      month: date.month,
      year: date.year,
    };
    dispatch(authOperations.getAllTransactions(params)).then(
      res => {
        if (res.payload === undefined) {
          return setTransactions([]);
        }
        const trans = res.payload.allTransactions;

        setTransactions(trans);
        dispatch(authOperations.fetchCurrentUser())
          .unwrap()
          .catch(() => {
            Notify.warning(
              'Sorry, your authorization token expired, please re-login',
              {}
            );
            dispatch(authOperations.logOut());
          });
      },
      () => {
        setTransactions([]);
      }
    );
  }, [type, getBalance, daySelected]);

  const arrayLength = transactions.length;

  if (arrayLength === 0) {
    return <p className={styles.message}>{t('noTransactions')}</p>;
  }

  transactions.map(item => {
    const day = item.day;
    const month = item.month;
    const year = item.year;
    if (day === '' && month === '' && year === '') {
      return;
    } else {
      const date = `${day}.${month}.${year}`;
      item.date = date;
    }
  });

  return (
    <>
      <ul className={styles.transactionHistory}>
        {transactions.map(item => (
          <Transaction
            key={item._id}
            id={item._id}
            date={item.date}
            description={item.description}
            category={item.categories}
            sum={item.value}
            income={item.income}
          />
        ))}
      </ul>
    </>
  );
}
