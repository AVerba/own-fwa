import { useState, useEffect } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import sprite from '../../../images/sprite.svg';
import styles from './HeaderTable.module.scss';

export function HeaderTable({
  handleDateSort,
  handleDescriptionSort,
  handleCategorySort,
  handleValueSort,
}) {
  const { t } = useTranslation();
  const [dateSortType, setDateSortType] = useState(true);
  const [descriptionSortType, setDescriptionSortType] = useState(false);
  const [categorySortType, setCategorySortType] = useState(false);
  const [valueSortType, setValueSortType] = useState(false);

  const [dateIcon, setDateIcon] = useState(true);
  const [descriptionIcon, setDescriptionIcon] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(false);
  const [valueIcon, setValueIcon] = useState(false);

  const handleDate = e => {
    e.preventDefault();
    setDateSortType(prevShowModal => !prevShowModal);
    setDateIcon(true);

    handleDateSort(dateSortType);
    handleDescriptionSort('');
    handleCategorySort('');
    handleValueSort('');

    setDescriptionSortType(false);
    setCategorySortType(false);
    setValueSortType(false);

    setDescriptionIcon(false);
    setCategoryIcon(false);
    setValueIcon(false);
  };

  const handleDescription = e => {
    e.preventDefault();
    setDescriptionSortType(prevShowModal => !prevShowModal);
    setDescriptionIcon(true);

    handleDateSort('');
    handleDescriptionSort(descriptionSortType);
    handleCategorySort('');
    handleValueSort('');

    setDateSortType(false);
    setCategorySortType(false);
    setValueSortType(false);

    setDateIcon(false);
    setCategoryIcon(false);
    setValueIcon(false);
  };

  const handleCategory = e => {
    e.preventDefault();
    setCategorySortType(prevShowModal => !prevShowModal);
    setCategoryIcon(true);

    handleDateSort('');
    handleDescriptionSort('');
    handleCategorySort(categorySortType);
    handleValueSort('');

    setDateSortType(false);
    setDescriptionSortType(false);
    setValueSortType(false);

    setDateIcon(false);
    setDescriptionIcon(false);
    setValueIcon(false);
  };

  const handleSum = e => {
    e.preventDefault();
    setValueSortType(prevShowModal => !prevShowModal);
    setValueIcon(true);

    handleDateSort('');
    handleDescriptionSort('');
    handleCategorySort('');
    handleValueSort(valueSortType);

    setDateSortType(false);
    setDescriptionSortType(false);
    setCategorySortType(false);

    setDateIcon(false);
    setDescriptionIcon(false);
    setCategoryIcon(false);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.date_wrapper}>
          <p
            className={styles.date}
            onClick={handleDate}
            style={dateIcon ? { color: '#FF751D' } : {}}
          >
            {t('date')}
            {dateSortType ? (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-up`}></use>
              </svg>
            ) : (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-down`}></use>
              </svg>
            )}
          </p>
        </div>
        <div className={styles.description_wrapper}>
          <p
            className={styles.description}
            onClick={handleDescription}
            style={descriptionIcon ? { color: '#FF751D' } : {}}
          >
            {t(`description`)}
            {descriptionSortType ? (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-up`}></use>
              </svg>
            ) : (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-down`}></use>
              </svg>
            )}
          </p>
        </div>
        <div className={styles.category_wrapper}>
          <p
            className={styles.category}
            onClick={handleCategory}
            style={categoryIcon ? { color: '#FF751D' } : {}}
          >
            {t(`сategory`)}
            {categorySortType ? (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-up`}></use>
              </svg>
            ) : (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-down`}></use>
              </svg>
            )}
          </p>
        </div>
        <div className={styles.sum_wrapper}>
          <p
            className={styles.sum}
            onClick={handleSum}
            style={valueIcon ? { color: '#FF751D' } : {}}
          >
            {t('sum')}
            {valueSortType ? (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-up`}></use>
              </svg>
            ) : (
              <svg className={styles.sort_icon} width="14" height="14">
                <use href={`${sprite}#arrow-down`}></use>
              </svg>
            )}
          </p>
        </div>
        {/* <p className={styles.action}></p> */}
      </div>
    </>
  );
}
