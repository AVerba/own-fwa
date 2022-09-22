import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RedactSvgSelector } from './RedactSvgSelector.jsx';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from '../../Modal';
import { authOperations } from '../../../redux/operation';
import { formatSum } from '../../../utils/formSum';
import styles from './TableMobile.module.scss';

const Transaction = ({ id, date, description, category, sum, income }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const value = sum;
  const isIncome = income;

  const toggleModal = e => {
    e.preventDefault();
    setShowModal(prevShowModal => !prevShowModal);
  };

  if (value) {
    const newSum = formatSum(sum);
    return (
      <>
        <li className={styles.transaction}>
          <div className={styles.left_group}>
            <p className={styles.transaction_description}>
              {t(`${description}`)}
            </p>
            <div className={styles.flex}>
              <p className={styles.transaction_date}>{date}</p>
              <p className={styles.transaction_category}>{t(`${category}`)}</p>
            </div>
          </div>
          <div className={styles.rigth_group}>
            {isIncome && (
              <p className={styles.green_color}>
                {newSum} {t('hrn')}
              </p>
            )}
            {!isIncome && (
              <p className={styles.red_color}>
                -{newSum} {t('hrn')}
              </p>
            )}

            <button
              type="button"
              onClick={toggleModal}
              className={styles.button}
            >
              <RedactSvgSelector id="delete" />
            </button>
          </div>
        </li>
        {showModal && (
          <Modal
            message={t('modalDeleteText')}
            onYesClick={() =>
              dispatch(authOperations.deleteTransaction({ id }))
            }
            onNoClick={toggleModal}
          />
        )}
      </>
    );
  }
};

Transaction.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  sum: PropTypes.number,
  income: PropTypes.bool,
};

export default Transaction;
