import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoryInputMobile from './CategoryInputMobile';
import styles from './FormMobile.module.scss';
import sprite from '../../../images/sprite.svg';
import { authOperations } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useTranslation } from 'react-i18next';

const FormMobile = ({ date, goBack }) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sum, setSum] = useState('0.00');

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setDescription('');
    setCategory('');
    setSum('');
  }, [location.pathname]);

  const handleDescriptionChange = event => {
    setDescription(event.currentTarget.value);
  };
  const handleCategoryChange = event => {
    setCategory(event.currentTarget.value);
  };
  const handleSumChange = event => {
    setSum(event.currentTarget.value);
  };

  // Rules for Description input keydown events
  function handleDescriptionKeydown(event) {
    const inputDescription = event.currentTarget.value;
    if (inputDescription.length === 19) {
      Notify.warning(`${t('descriptionMax')}`);
    }
  }

  // Rules for Sum input keydown events
  function handleSumKeydown(event) {
    const inputSum = event.currentTarget.value;
    if (inputSum === '') {
      ['e', 'E', '+', '-', '.', '0'].includes(event.key) &&
        event.preventDefault();
    }
    if (inputSum !== '') {
      ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
    }
    // Rule for not letting enter more than two digits after the dot
    if (inputSum.includes('.') && String(inputSum).split('.')[1].length === 2) {
      [
        'e',
        'E',
        '+',
        '-',
        '.',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ].includes(event.key) && event.preventDefault();
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    // Form fields rules
    if (
      description.trim() === '' &&
      category.trim() === '' &&
      sum.trim() === ''
    ) {
      setDescription('');
      setCategory('');
      setSum('');
      return Notify.warning(`${t('noTransInfo')}`);
    }

    if (description.trim() === '' && category.trim() === '') {
      setDescription('');
      setCategory('');
      return Notify.warning(`${t('noDescrAndCategory')}`);
    }

    if (description.trim() === '' && sum.trim() === '') {
      setDescription('');
      setSum('');
      return Notify.warning(`${t('noDescrAndSum')}`);
    }

    if (category.trim() === '' && sum.trim() === '') {
      setCategory('');
      setSum('');
      return Notify.warning(`${t('noCategoryAndSum')}`);
    }

    if (description.trim() === '') {
      setDescription('');
      return Notify.warning(`${t('noDescr')}`);
    }

    if (category.trim() === '') {
      setCategory('');
      return Notify.warning(`${t('noCategory')}`);
    }

    if (sum.trim() === '') {
      setSum('');
      return Notify.warning(`${t('noSum')}`);
    }

    if (description.length < 3) {
      return Notify.warning(`${t('descriptionMin')}`);
    }

    const dayQuery = new Date(date).getDate().toString().padStart(2, '0');
    const monthQuery = (new Date(date).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const yearQuery = new Date(date).getFullYear();

    const transaction = {
      value: Number(sum),
      categories: category,
      description: description,
      day: dayQuery,
      month: monthQuery,
      year: String(yearQuery),
    };
    const type = location.pathname.slice(1);

    dispatch(authOperations.addTransaction({ type, transaction }))
      .then(Notify.success(`${t('transSuccess')}`))
      .catch(error => {
        Notify.failure(`${error.message}`);
      });

    setDescription('');
    setSum('');

    goBack();
  };

  const handleClear = event => {
    event.preventDefault();

    setDescription('');
    setCategory('');
    setSum('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input_wrapper}>
        <input
          className={styles.description}
          type="text"
          autoComplete="off"
          maxLength="20"
          name="description"
          placeholder={t('description')}
          value={description}
          onChange={handleDescriptionChange}
          onKeyPress={handleDescriptionKeydown}
        />
        <CategoryInputMobile
          type="expenses"
          categoryPick={category}
          setCategory={setCategory}
          autoComplete="off"
          name="categories"
          value={category}
          onChange={handleCategoryChange}
        />

        <label className={styles.sum_label}>
          <svg className={styles.sum_icon} width="20" height="20">
            <use href={`${sprite}#calculator`}></use>
          </svg>
          <div className={styles.separator}></div>
          <input
            className={styles.sum}
            type="number"
            autoComplete="off"
            name="sum"
            pattern="d\+\.\d\d$"
            placeholder="0.00"
            value={sum}
            onChange={handleSumChange}
            onKeyPress={handleSumKeydown}
          />
        </label>
      </div>

      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.button_input}
          onClick={handleSubmit}
        >
          {t('add')}
        </button>
        <button
          type="button"
          className={styles.button_clear}
          onClick={handleClear}
        >
          {t('clear')}
        </button>
      </div>
    </form>
  );
};

export default FormMobile;
