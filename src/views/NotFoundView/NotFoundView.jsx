import styles from './NotFoundView.module.css';
import { Background } from '../../components/UI/Background';
import { useNavigate } from 'react-router-dom';

const NotFoundView = () => {
  const navigate = useNavigate();

  setTimeout(() => navigate('/expense'), 1500);
  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <h4 className={styles.title}>We are sorry, but page not found ...</h4>
    </>
  );
};
export default NotFoundView;
