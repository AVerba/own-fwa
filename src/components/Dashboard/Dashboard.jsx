import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/operation';
import Controls from './Controls';
import Form from './Form';
import Table from './Table';
import styles from './Dashboard.module.scss';
import { Summary } from '../Summary';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation();
  const getBalance = useSelector(authSelectors.getBalance);

  return (
    <>
      <div
        className={styles.container}
        style={getBalance === null ? { pointerEvents: 'none' } : {}}
      >
        <div className={styles.dashboard}>
          <div className={styles.controls}>
            <Controls link={'/expense'} title={t('expense')} />
            <Controls link={'/income'} title={t('income')} />
          </div>
          <div className={styles.board}>
            <Form />
            <Table />
          </div>
          <Summary />
        </div>
      </div>
    </>
  );
};
