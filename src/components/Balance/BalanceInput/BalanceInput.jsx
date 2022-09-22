import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../../redux/operation';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './BalanceInput.module.scss';
import { useTranslation } from 'react-i18next';

export const BalanceInput = ({ isReportsVariant }) => {
  const { t } = useTranslation();
  const getBalance = useSelector(authSelectors.getBalance);
  const [balance, setBalance] = useState(
    getBalance === null ? '00.00 UAH' : getBalance
  );
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setBalance(
      Number(getBalance)
        .toLocaleString('cs-CZ', {
          style: 'currency',
          currency: 'UAH',
        })
        .replace(',', '.')
    );
  }, [getBalance]);

  const handleChange = e => {
    setBalance(e.target.value);
    setIsDisabledBtn(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const balance = parseInt(event.target[0].value);

    dispatch(authOperations.setBalance({ balance }))
      .then(response => {
        setBalance(
          Number(balance)
            .toLocaleString('cs-CZ', {
              style: 'currency',
              currency: 'UAH',
            })
            .replace(',', '.')
        );
        setIsDisabledBtn(true);
        Notify.success(`Your balance updated successfully.`);
      })
      .catch(error => {
        error?.response?.data && Notify.failure(error.message);
      });
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor="balance" className={s.label}>
          {t('balanceText')}
        </label>
        <div className={s.btnContainer}>
          <input
            id="#balance"
            className={s.input}
            type="text"
            name="balance"
            value={balance}
            onChange={handleChange}
            minLength="1"
            pattern="^[0-9]+$"
            title="Field may contain only numbers from 0 to 9"
            required
            disabled={getBalance === null ? false : true}
            onFocus={() => setBalance('')}
          />
          {!isReportsVariant && (
            <button
              type="submit"
              className={!isDisabledBtn ? s.button : s.buttonDisabled}
              disabled={isDisabledBtn}
            >
              {t('confirmButton')}
            </button>
          )}
        </div>
      </form>
      {getBalance === null ? (
        <div className={s.popUpContainer}>
          <p className={s.popUpText}>{t('balanceMessage1')}</p>
          <p className={s.popUpTextBottom}>{t('balanceMessage2')} &#128521;</p>
        </div>
      ) : null}
    </>
  );
};
