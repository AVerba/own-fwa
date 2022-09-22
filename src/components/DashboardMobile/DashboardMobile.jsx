import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/operation';
import { Balance } from '../Balance';
import Calendar from '../Calendar';
import ControlsMobile from './ControlsMobile';
import FormMobile from './FormMobile';
import TableMobile from './TableMobile';
import styles from './DashboardMobile.module.scss';
import sprite from '../../images/sprite.svg';
import { useTranslation } from 'react-i18next';

export const DashboardMobile = () => {
  const { t } = useTranslation();
  const [transactionDate, setTransactionDate] = useState('');
  const [addTransaction, setAddTransaction] = useState(false);

  const getBalance = useSelector(authSelectors.getBalance);

  const handleControlsClick = () => {
    setAddTransaction(!addTransaction);
  };

  const navigate = useNavigate();
  const location = useLocation();

  function handleQueryChange() {
    const dayQuery = new Date(transactionDate)
      .getDate()
      .toString()
      .padStart(2, '0');
    const monthQuery = (new Date(transactionDate).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const yearQuery = new Date(transactionDate).getFullYear();

    navigate(
      `${location.pathname}?day=${dayQuery}&month=${monthQuery}&year=${yearQuery}&transactions=all`
    );
  }

  useEffect(() => {
    handleQueryChange();
  }, [transactionDate, location.pathname, addTransaction]);

  return (
    <>
      <div className={styles.container}>
        {addTransaction ? (
          <div className={styles.transaction_wrapper}>
            <button
              className={styles.button_back}
              onClick={handleControlsClick}
              type="button"
            >
              <svg className={styles.calendar_icon} width="24" height="24">
                <use href={`${sprite}#go_back`}></use>
              </svg>
            </button>
            <FormMobile date={transactionDate} goBack={handleControlsClick} />
          </div>
        ) : (
          <>
            <Balance />
            <div
              className={styles.calendar_wrapper}
              style={getBalance === null ? { pointerEvents: 'none' } : {}}
            >
              <Calendar dateHandler={setTransactionDate} />
            </div>

            <TableMobile
              date={transactionDate}
              style={getBalance === null ? { pointerEvents: 'none' } : {}}
            />

            <div
              className={styles.controls}
              onClick={handleControlsClick}
              style={getBalance === null ? { pointerEvents: 'none' } : {}}
            >
              <ControlsMobile link={'/expense'} title={t('expense')} />
              <ControlsMobile link={'/income'} title={t('income')} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
