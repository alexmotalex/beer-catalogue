import { Navigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { BackButton } from '../../components/Buttons/BackButton';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { ROUTES } from '../../constants/routes';
import styles from './CheckEmailPage.module.scss';
import { Toast } from '../../components/Toast';

const RESEND_TIMEOUT_SECONDS = 60;

export const CheckEmailPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT_SECONDS);
  const [toast, setToast] = useState<string | null>(null);

  const { register, passwordReset } = useAuth();
  const location = useLocation();

  const email = location.state?.email ?? '';
  const formData = location.state?.formData || {};
  const type = location.state?.type || '';

  const resendFn = type === 'reset-password' ? passwordReset : register;

  const canResend = secondsLeft === 0;
  const resendInfo = canResend
    ? 'Resend available'
    : 'Resend available in ' + secondsLeft + 's';

  const handleResend = async () => {
    if (!canResend) {
      return;
    }

    await resendFn(formData);

    setSecondsLeft(RESEND_TIMEOUT_SECONDS);
    setToast('Verification link sent');
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
    <section className="pageContent">
      {toast && <Toast title={toast} onClose={() => setToast(null)} />}

      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className="title">Check your email</h1>

      <p className="subtitle">
        We've sent a verification link to{' '}
        <strong className="subtitleEmail">{email}</strong>
      </p>

      <div className={styles.content}>
        <h2 className={styles.contentTitle}>
          Open your inbox and click the verification link.
        </h2>

        <div className={styles.contentButton}>
          <PrimaryButton
            type="button"
            title="Resend link"
            onClick={handleResend}
            disabled={!canResend}
          />
        </div>

        <div className={styles.contentFooter}>
          <span className={styles.contentFooterText}>
            Didn't receive the email?
          </span>
          <span className={styles.contentFooterInfo}>{resendInfo}</span>
        </div>
      </div>
    </section>
  );
};
