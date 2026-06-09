import { Navigate, useLocation } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { SuccessMessage } from '../../components/SuccessMessage';

import styles from './CheckEmailPage.module.scss';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';

const RESEND_TIMEOUT_SECONDS = 60;

export const CheckEmailPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT_SECONDS);
  const location = useLocation();
  const { register } = useAuth();
  const email = location.state?.email ?? '';
  const formData = location.state?.formData ?? {};

  console.log(location);
  const canResend = secondsLeft === 0;
  const resendInfo = canResend
    ? 'Resend available'
    : 'Resend available in ' + secondsLeft + 's';

  const handleResend = async () => {
    if (!canResend) {
      return;
    }

    await register(formData);

    setSecondsLeft(RESEND_TIMEOUT_SECONDS);
  };

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timerId = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [secondsLeft]);

  if (!email) {
    return <Navigate to={ROUTES.signUp} replace />;
  }

  return (
    <section className={styles.checkEmail}>
      <div className={styles.successMessageWrapper}>
        <SuccessMessage title="Verification link sent" />
      </div>

      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className={styles.checkEmailTitle}>Check your email</h1>

      <p className={styles.checkEmailSubtitle}>
        We've sent a verification link to{' '}
        <strong className={styles.checkEmailSubtitleEmail}>
          {'john.doe@email.com'}
        </strong>
      </p>

      <div className={styles.checkEmailContent}>
        <h2 className={styles.checkEmailContentTitle}>
          Open your inbox and click the verification link.
        </h2>

        <div className={styles.checkEmailContentButton}>
          <PrimaryButton
            title="Resend link"
            onClick={handleResend}
            disabled={!canResend}
          />
        </div>

        <div className={styles.checkEmailContentFooter}>
          <span className={styles.checkEmailContentFooterText}>
            Didn't receive the email?
          </span>
          <span className={styles.checkEmailContentFooterInfo}>
            {resendInfo}
          </span>
        </div>
      </div>
    </section>
  );
};
