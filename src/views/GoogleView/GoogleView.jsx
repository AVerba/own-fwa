import styles from './GoogleView.module.css';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authOperations } from '../../redux/operation';
import { Background } from '../../components/UI/Background';

const GoogleView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.search.slice(7);

  dispatch(authOperations.loginWithGoogle(token)).then(res => {
    navigate('/expense');
  });

  return (
    <>
      <div className={styles.backgroundContainer}>
        <Background />
      </div>
      <h4 className={styles.title}>Please wait... login in progress</h4>
    </>
  );
};

export default GoogleView;
