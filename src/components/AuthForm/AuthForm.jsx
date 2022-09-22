import styles from './AuthForm.module.css';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/operation';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Loader } from '../Loader';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isTablet } from '../../utils/mediaQuery';
import { Google } from '../Google';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useTranslation } from 'react-i18next';

YupPassword(Yup);

export const AuthForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    email: '',
    password: '',
  };
  const [loaderState, setLoaderState] = useState(false);
  const [initialValues, setInitialValues] = useState(initState);
  const [logEmail, setLogEmail] = useState('');
  const [logPass, setLogPass] = useState('');

  const IsMobile = isMobile(useMediaQuery);
  const IsTablet = isTablet(useMediaQuery);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(`${t('requiredNote')}`)
      .email(`${t('wrongEmail')}`)
      .matches(
        /^(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[a-z_-]+\d*|\d*[a-z_-] [0-9A-Za-z]{1} )@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
        `${t('wrongSpecialSymbol')}`
      ),

    password: Yup.string()
      .required(`${t('requiredNote')}`)
      .min(6, `${t('pass6symbol')}`)
      .max(20, `${t('pass20symbols')}`)
      .minLowercase(2, `${t('passLowerCase')}`)
      .minUppercase(2, `${t('passUpperCase')}`)
      .minNumbers(3, `${t('passMinNumber')}`)
      .minSymbols(1, `${t('passMinSymbol')}`),
  });

  const onLogin = (data, e) => {
    e.preventDefault();
    setLoaderState(true);
    const { email, password } = data;
    dispatch(authOperations.logIn({ email, password }))
      .then(response => {
        setLoaderState(false);
        resetAllFields();
        navigate('/expense');
      })
      .catch(() => {
        setLoaderState(false);
        console.log('wrong pass or login::');
      });
  };

  const onRegister = (data, e) => {
    e.preventDefault();
    setLoaderState(true);
    const { email, password } = data;
    setLogEmail(email);
    setLogPass(password);

    dispatch(authOperations.register({ email, password }))
      .then(res => {
        const { payload } = res;
        const { user } = payload;

        if (user.email === email) {
          dispatch(authOperations.logIn({ email, password }))
            .then(response => {
              setLoaderState(false);
              resetAllFields();
              navigate('/expense');
            })
            .catch(() => {
              setLoaderState(false);
              console.log('wrong pass or login::');
            });
        }
      })
      .catch(() => {
        setLoaderState(false);
        Notify.failure(`User already register/ Try another login`);
        console.log('wong pass or email::');
      });

    resetAllFields();
  };

  const onError = error => {
    error.email && Notify.failure(`${errors.email.message}`);
    error.password && Notify.failure(`${errors.password.message}`);
  };
  const resetAllFields = () => {
    resetField('email');
    resetField('password');
  };
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  return (
    <>
      {loaderState && <Loader />}
      <Form
        className={
          IsMobile
            ? styles.formAuthMobile
            : IsTablet
            ? styles.formAuthTablet
            : styles.formAuthDesktop
        }
        onSubmit={handleSubmit(onRegister, onError)}
      >
        <Google />

        <Form.Group className={styles.emailGroup} controlId="formBasicEmail">
          <Form.Label className={styles.label}>{t('email')} </Form.Label>
          <Form.Control
            className={IsMobile ? styles.mobInput : styles.input}
            type="email"
            placeholder={t('emailPlaceholder')}
            {...register('email')}
          />

          {errors.email && errors.email.type === 'required' && (
            <Form.Text className={styles.tooltip}>
              <span className={styles.dotTooltip}>*</span>
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className={styles.passGroup} controlId="formBasicPassword">
          <Form.Label className={styles.label}>{t('password')}</Form.Label>
          <Form.Control
            className={IsMobile ? styles.mobInput : styles.input}
            autoComplete="off"
            type="password"
            placeholder={t('passPlaceholder')}
            {...register('password')}
          />
          {errors.password && errors.password.type === 'required' && (
            <Form.Text className={styles.tooltip}>
              <span className={styles.dotTooltip}>*</span>
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <div className={styles.controlBar}>
          <Button
            className={styles.loginButton}
            variant="primary"
            type="button"
            onClick={handleSubmit(onLogin, onError)}
          >
            {' '}
            {t('signin-btn')}
          </Button>
          <Button
            className={styles.registerButton}
            variant="primary"
            type="submit"
          >
            {t('signup-btn')}
          </Button>
        </div>
      </Form>
    </>
  );
};
