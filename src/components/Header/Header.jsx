import styles from './Header.module.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { ReactComponent as Logout } from './icons/logoutIcon.svg';
import { LangSwitcher } from '../LangSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import { authSelectors, authOperations } from '../../redux/operation';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const loggedIn = useSelector(authSelectors.getIsLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const email = useSelector(authSelectors.getEmail);
  const dispatch = useDispatch();

  const toggleModal = e => {
    e.preventDefault();
    setShowModal(prevShowModal => !prevShowModal);
  };

  const letter = email?.split('');
  return (
    <div>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Link to="/">
            <Logo />
          </Link>
          <div className={styles.controls}>
            <LangSwitcher />
            {loggedIn ? (
              <div className={styles.user__menu}>
                <div className={styles.user__avatar}>
                  <span>{letter[0]}</span>
                </div>
                <span className={styles.user__name}>{email.split('@')[0]}</span>
                {dropdown && (
                  <div className={styles.dropdown}>
                    <span className={styles.user_mail} title={email}>
                      {email}
                    </span>

                    <button
                      type="button"
                      className={styles.button}
                      onClick={() => dispatch(authOperations.logOut())}
                    >
                      Log out
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  className={styles.button_logout_mobile}
                  onClick={toggleModal}
                >
                  <Logout />
                </button>
                <a
                  href="/"
                  className={styles.button_logout}
                  onClick={toggleModal}
                >
                  {' '}
                  {t('exitHeader')}
                </a>
              </div>
            ) : null}
          </div>
        </header>
      </div>
      {showModal && (
        <Modal
          message={t('modalLogoutText')}
          onYesClick={() => dispatch(authOperations.logOut())}
          onNoClick={toggleModal}
        />
      )}
    </div>
  );
};
export default Header;
