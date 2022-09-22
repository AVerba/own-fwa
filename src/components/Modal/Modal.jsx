import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseModal } from '../../images/closeIcon.svg';
import styles from './Modal.module.scss';
import { useTranslation } from 'react-i18next';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ message, onNoClick, onYesClick }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onNoClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNoClick]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onNoClick(e);
    }
  };

  const handleYesClick = e => {
    onYesClick();
    onNoClick(e);
  };

  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        onNoClick(e);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return createPortal(
    <div onClick={handleBackdropClick} className={styles.backdrop}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeModalBtn}
          onClick={onNoClick}
        >
          <CloseModal />
        </button>
        <p className={styles.message}>{message}</p>
        <div className={styles.btnContainer}>
          <button
            className={styles.btn_open}
            type="button"
            onClick={handleYesClick}
          >
            {t('modalYes')}
          </button>
          <button
            className={styles.btn_close}
            type="button"
            onClick={onNoClick}
          >
            {t('modalNo')}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
