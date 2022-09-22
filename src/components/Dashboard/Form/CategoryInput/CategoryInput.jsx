import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../../../redux/operation';
import styles from './CategoryInput.module.scss';
import { useTranslation } from 'react-i18next';

const CategoryInput = ({ type, categoryPick, setCategory }) => {
  const { t } = useTranslation();
  const [isCategories, setIsCategories] = useState(true);
  const categories = useSelector(authSelectors.getCategories);

  const location = useLocation();

  useEffect(() => {
    setIsCategories(true);
  }, [location.pathname]);

  const handleClick = () => {
    setIsCategories(!isCategories);
  };

  const handleCategoryClick = e => {
    setCategory(e.currentTarget.value);
    handleClick();
  };

  const expenses = categories.filter(category => {
    return category.type === 'expenses';
  });

  const income = categories.filter(category => {
    return category.type === 'income';
  });

  // Closing categories on outside click
  const ref = useRef();
  useOnClickOutside(ref, () => setIsCategories(true));

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.form_input_category_parent} onClick={handleClick}>
        <input
          className={styles.form_input_category}
          autoComplete="off"
          id="category_input"
          type="text"
          readOnly
          value={t(`${categoryPick}`)}
          placeholder={t('category')}
        />

        {isCategories ? (
          <span className={styles.arrow_down} id="arrow"></span>
        ) : (
          <span className={styles.arrow_up} id="arrow"></span>
        )}
      </div>
      {isCategories ? (
        <span></span>
      ) : (
        <ul className={styles.form_category_list}>
          {location.pathname === '/expense'
            ? expenses.map(data => (
                <li key={data.id}>
                  <label tabIndex={0} className={styles.category_label}>
                    <input
                      onClick={handleCategoryClick}
                      hidden
                      value={data.title}
                      readOnly
                      type="radio"
                      name="exp_category"
                      className={styles.radiobutton}
                    />
                    {t(`${data.title}`)}
                  </label>
                </li>
              ))
            : income.map(data => (
                <li key={data.id}>
                  <label tabIndex={0} className={styles.category_label}>
                    <input
                      onClick={handleCategoryClick}
                      hidden
                      value={data.title}
                      readOnly
                      type="radio"
                      name="exp_category"
                      className={styles.radiobutton}
                    />
                    {t(`${data.title}`)}
                  </label>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default CategoryInput;
