import styles from './SummaryTrans.module.scss';
import { useMediaQuery } from 'react-responsive';
import { isDesktop, isTablet } from '../../utils/mediaQuery';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import operations from '../../redux/operation/authOperations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import summarySelectors from '../../redux/summary/summarySelector';

export const SummaryTrans = () => {
  const Desktop = isDesktop(useMediaQuery);
  const Table = isTablet(useMediaQuery);
  const getMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');

  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    dispatch(operations.getTransactionsByMonth(type));
  }, [dispatch, type]);

  const mounth = useSelector(summarySelectors.getSummary);

  return (
    <div className={Desktop || Table ? styles.container : styles.none}>
      <div className={styles.titleBlock}>
        <h3>Сводка</h3>
      </div>

      <ul>
        {mounth.lenght > 0 ? (
          mounth.map(({ total, _id }) => (
            <li key={_id} className={styles.monthPoint}>
              <p className={styles.monthPointText}>{getMonth._id}</p>
              <p className={styles.monthPointText}>{total}</p>
            </li>
          ))
        ) : (
          <div className={styles.list}> </div>
        )}
      </ul>
    </div>
  );
};
