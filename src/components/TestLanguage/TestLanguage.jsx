import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../LangSwitcher';

const TestLanguage = () => {
  const { t } = useTranslation();

  return (
    <>
      <LangSwitcher />
      <p>{t('registrationGoogle')}</p>
      <p>{t('registrationEmail')}</p>
      <p>{t('registrationPassword')}</p>
    </>
  );
};

export default TestLanguage;
