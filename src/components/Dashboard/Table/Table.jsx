import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { HeaderTable } from './HeaderTable.jsx';
import Transaction from './Transaction';
import styles from './Table.module.scss';
import { authOperations, authSelectors } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { commonDate } from '../../../utils/date';
import GlobalContext from '../../../context/GlobalContext';

export default function Table() {
  const [transactions, setTransactions] = useState([]);
  const [dateSort, setDateSort] = useState('');
  const [descriptionSort, setDescriptionSort] = useState('');
  const [categorySort, setCategorySort] = useState('');
  const [valueSort, setValueSort] = useState('');
  const dispatch = useDispatch();

  const location = useLocation();
  const getBalance = useSelector(authSelectors.getBalance);
  const type = location.pathname.slice(1);
  const { daySelected } = useContext(GlobalContext);

  useEffect(() => {
    const date = commonDate(daySelected);
    const params = {
      type,
      day: date.day,
      month: date.month,
      year: date.year,
    };
    dispatch(authOperations.getTransactionListByType(params)).then(
      res => {
        if (res.payload === undefined) {
          return setTransactions([]);
        }
        const trans = res.payload.result;

        // Setting first date sorting rule
        trans.reverse();

        // Date sorting handler
        if (
          dateSort === true &&
          descriptionSort === '' &&
          categorySort === '' &&
          valueSort === ''
        ) {
          trans.reverse();
        }

        // Description descending
        if (
          dateSort === '' &&
          descriptionSort === true &&
          categorySort === '' &&
          valueSort === ''
        ) {
          trans.sort((a, b) => a.description.localeCompare(b.description));
        }

        // Description ascending
        if (
          dateSort === '' &&
          descriptionSort === false &&
          categorySort === '' &&
          valueSort === ''
        ) {
          trans.sort((a, b) => b.description.localeCompare(a.description));
        }

        // Category descending
        if (
          dateSort === '' &&
          descriptionSort === '' &&
          categorySort === true &&
          valueSort === ''
        ) {
          trans.sort((a, b) => a.categories.localeCompare(b.categories));
        }

        // Category ascending
        if (
          dateSort === '' &&
          descriptionSort === '' &&
          categorySort === false &&
          valueSort === ''
        ) {
          trans.sort((a, b) => b.categories.localeCompare(a.categories));
        }

        // Value descending
        if (
          dateSort === '' &&
          descriptionSort === '' &&
          categorySort === '' &&
          valueSort === true
        ) {
          trans.sort((a, b) => b.value - a.value);
        }

        // Value ascending
        if (
          dateSort === '' &&
          descriptionSort === '' &&
          categorySort === '' &&
          valueSort === false
        ) {
          trans.sort((a, b) => a.value - b.value);
        }

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
  }, [
    type,
    getBalance,
    daySelected,
    dateSort,
    descriptionSort,
    categorySort,
    valueSort,
  ]);

  const trans = transactions.map(item => {
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

  const arrayLength = trans.length;

  function createTableOfSixteenRows(length) {
    if (length >= 16) {
      return;
    }
    if (length < 16) {
      const id = nanoid();
      transactions.push({
        _id: `${id}`,
        date: '',
        day: '',
        month: '',
        year: '',
        description: '',
        categories: '',
        value: null,
        income: true,
      });
      const newArrayLength = transactions.length;
      createTableOfSixteenRows(newArrayLength);
    }
  }

  createTableOfSixteenRows(arrayLength);
  return (
    <>
      <HeaderTable
        handleDateSort={setDateSort}
        handleDescriptionSort={setDescriptionSort}
        handleCategorySort={setCategorySort}
        handleValueSort={setValueSort}
      />
      <div className={styles.scroll}>
        <div className={styles.window}>
          <table className={styles.transactionHistory}>
            <tbody>
              {transactions &&
                transactions.map(item => (
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
