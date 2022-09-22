import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RedactSvgSelector } from './RedactSvgSelector.jsx';
import { useDispatch } from 'react-redux';
import Modal from '../../Modal';
import { authOperations } from '../../../redux/operation';
import { useTranslation } from 'react-i18next';
import { formatSum } from '../../../utils/formSum';
import styles from './Table.module.scss';

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

    if (isIncome) {
      return (
        <>
          <tr>
            <td>{date}</td>
            <td>{t(`${description}`)}</td>
            <td>{t(`${category}`)}</td>
            <td className={styles.green_color}>
              {newSum} {t('hrn')}
            </td>
            <td>
              <button
                type="button"
                onClick={toggleModal}
                className={styles.button}
              >
                <RedactSvgSelector id="delete" />
              </button>
            </td>
          </tr>
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

    return (
      <>
        <tr>
          <td>{date}</td>
          <td>{t(`${description}`)}</td>
          <td>{t(`${category}`)}</td>
          <td className={styles.red_color}>
            - {newSum} {t('hrn')}
          </td>
          <td>
            <button
              type="button"
              onClick={toggleModal}
              className={styles.button}
            >
              <RedactSvgSelector id="delete" />
            </button>
          </td>
        </tr>
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

  return (
    <tr className={styles.emtyLine}>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td></td>
      <td></td>
    </tr>
  );
};

Transaction.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  sum: PropTypes.number,
};

export default Transaction;
