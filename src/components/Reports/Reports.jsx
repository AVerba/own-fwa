import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconSvg } from '../UI';
import { Charts } from '../Charts';
import svgSprite from '../../images/sprite.svg';
import {
  getTransactions,
  getType,
  getData,
  getDate,
  getIsLoading,
  updateType,
  getTotalSumValue,
  getTotalSum,
} from '../../redux/reports';
import { formatSum, normalizeMonth } from '../../utils/';
import s from './Reports.module.scss';

const Reports = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentCategory, setCurrentCategory] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const transactions = useSelector(getTransactions);
  const type = useSelector(getType);
  const date = useSelector(getDate);
  const isLoading = useSelector(getIsLoading);
  const totalSumValue = useSelector(getTotalSumValue);

  const memoTransactions = useMemo(() => {
    if (transactions.length < 2) {
      return transactions;
    }

    return [...transactions].sort((a, b) => {
      return b.totalCategoriesSum - a.totalCategoriesSum;
    });
  }, [transactions]);

  const memoSumExpense = useMemo(() => {
    if (totalSumValue.length) {
      return totalSumValue.find(({ _id: category }) => {
        return !category;
      });
    }
  }, [totalSumValue]);

  const memoSumIncomes = useMemo(() => {
    if (totalSumValue.length) {
      return totalSumValue.find(({ _id: category }) => {
        return category;
      });
    }
  }, [totalSumValue]);

  const isExpenseCategory = type === 'expense' ? 'income' : 'expense';
  const isExpenseTitle =
    type === 'expense' ? 'reportsExpenses' : 'reportsIncomes';
  const isDateExist = Object.keys(date).length;
  const transactionsDontExist = !isLoading && !memoTransactions.length;

  const getTransactionsData = useCallback(async () => {
    try {
      if (isDateExist) {
        const normalizedMonth = normalizeMonth(date.month);
        dispatch(getData({ type, month: normalizedMonth, year: date.year }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [isDateExist, date, dispatch, type]);

  const getTotalSumData = useCallback(async () => {
    try {
      if (isDateExist) {
        const normalizedMonth = normalizeMonth(date.month);
        dispatch(getTotalSum({ month: normalizedMonth, year: date.year }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, date, isDateExist]);

  const makeChartsData = array => {
    return array
      .map(({ totalDescriptionSum, _id: { description } }) => {
        return {
          sum: totalDescriptionSum,
          category: description,
          label: formatSum(totalDescriptionSum),
        };
      })
      .sort((a, b) => {
        return b.sum - a.sum;
      })
      .splice(0, 10);
  };

  const resetCategory = () => {
    setChartsData([]);
    setCurrentCategory([]);
  };

  const handleTypeChange = () => {
    dispatch(updateType(isExpenseCategory));
    resetCategory();
  };

  const handleCategoryClick = (id, value) => {
    setCurrentCategory(value);
    const detailedTransactions = makeChartsData(memoTransactions[id]?.report);
    setChartsData(detailedTransactions);
  };

  const showDefaultChartsData = useCallback(() => {
    if (memoTransactions.length) {
      const detailedTransactions = makeChartsData(memoTransactions[0].report);
      setChartsData(detailedTransactions);
      setCurrentCategory(memoTransactions[0]?._id);
    }
  }, [memoTransactions]);

  useEffect(() => {
    getTransactionsData();
  }, [getTransactionsData]);

  useEffect(() => {
    getTotalSumData();
  }, [getTotalSumData]);

  useEffect(() => {
    resetCategory();
  }, [date]);

  useEffect(() => {
    showDefaultChartsData();
  }, [showDefaultChartsData]);

  return (
    <>
      <div className={s.financeWrapper}>
        <div className={s.expensesWrapper}>
          <p className={s.financeTitle}>{`${t('reportsExpenses') + ':'}`}</p>
          {memoSumExpense?.totalSum ? (
            <p className={s.expenses}>{`- ${
              formatSum(memoSumExpense?.totalSum) + ' ' + t('hrn')
            }`}</p>
          ) : (
            <p className={s.expenses}>{t('noExpenses')}</p>
          )}
        </div>
        <span className={s.divider} />
        <div className={s.incomesWrapper}>
          <p className={s.financeTitle}>{`${t('reportsIncomes') + ':'}`}</p>
          {memoSumIncomes?.totalSum ? (
            <p className={s.incomes}>{`+ ${
              formatSum(memoSumIncomes?.totalSum) + ' ' + t('hrn')
            }`}</p>
          ) : (
            <p className={s.incomes}>{t('noIncomes')}</p>
          )}
        </div>
      </div>

      <div className={s.switchWrapper}>
        <div className={s.btnWrapper}>
          <button
            type="button"
            onClick={handleTypeChange}
            className={s.switchBtn}
          >
            <svg
              width="7"
              height="12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 1 2 6l4 5" stroke="#FF751D" strokeWidth="2" />
            </svg>
          </button>
          <p className={s.switchTitle}>{t(isExpenseTitle)}</p>
          <button
            type="button"
            onClick={handleTypeChange}
            className={s.switchBtn}
          >
            <svg
              width="7"
              height="12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m1 1 4 5-4 5" stroke="#FF751D" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {transactionsDontExist && (
          <p className={s.error}>{t('noTransactions')}</p>
        )}

        {isLoading ? (
          <p className={s.loading}>{t('loading')}</p>
        ) : (
          <ul className={s.categories}>
            {memoTransactions?.map(
              ({ totalCategoriesSum, _id: category }, id) => {
                return (
                  <li key={category} className={s.category}>
                    <p className={s.categoryValue}>{t(category)}</p>
                    <button
                      type="button"
                      className={
                        currentCategory === category
                          ? s.categoryBtnActive
                          : s.categoryBtn
                      }
                      onClick={() => handleCategoryClick(id, category)}
                    >
                      <IconSvg
                        sprite={svgSprite}
                        icon={category}
                        className={s.categoryIcon}
                      />
                    </button>
                    <span
                      className={
                        currentCategory === category
                          ? s.categoryBackgroundActive
                          : s.categoryBackground
                      }
                    />
                    <p className={s.categoryName}>
                      {formatSum(totalCategoriesSum)}
                    </p>
                  </li>
                );
              }
            )}
          </ul>
        )}
      </div>

      {!!chartsData.length && (
        <div className={s.chartsWrapper}>
          <Charts data={chartsData} />
        </div>
      )}
    </>
  );
};

export default Reports;
