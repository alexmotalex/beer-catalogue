import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { SlowServerMessage } from '../../components/SlowServerMessage';
import { ErrorInfo } from '../../components/ErrorInfo';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { RedirectText } from '../../components/RedirectText';
import { useSlowLoad } from '../../hooks/useSlowLoad';
import { useAuth } from '../../hooks/useAuth';
import { validateSignInForm } from '../../utils/formValidate/validateSignInForm';
import { emptySignInForm } from '../../constants/formsData';
import { ROUTES } from '../../constants/routes';
import type { AuthCredentials } from '../../types/Forms';
import styles from './SignInPage.module.scss';

export const SigninPage = () => {
  const [formData, setFormData] = useState<AuthCredentials>(emptySignInForm);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, serverErrors, setServerErrors } = useAuth();
  const isSlow = useSlowLoad(isLoading);

  const validationErrors = validateSignInForm(formData);
  const emailError = validationErrors.email || serverErrors.email;
  const passwordError = validationErrors.password || serverErrors.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setServerErrors({
      ...serverErrors,
      [name]: undefined,
    });

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowValidationErrors(true);

    const formIsInvalid = Object.keys(validationErrors).length > 0;

    if (formIsInvalid) {
      return;
    }

    const loginSuccess = await login(formData);

    if (loginSuccess) {
      setShowValidationErrors(false);

      navigate(ROUTES.home);
    }
  };

  useEffect(() => {
    setServerErrors({});
  }, [setServerErrors]);

  return (
    <section className="authPage">
      <div className="backButtonWrapper">
        <BackButton />
      </div>

      {isSlow && <SlowServerMessage />}

      <h1 className="authPageTitle">Sign In</h1>

      <p className="subtitle">Continue to your personal account</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="formInputsWrapper">
          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="email"
              label="Email"
              name="email"
              type="email"
              error={Boolean(showValidationErrors && emailError)}
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@email.com"
            />

            {showValidationErrors && emailError && (
              <ErrorInfo errorText={emailError} />
            )}
          </div>

          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="current-password"
              label="Password"
              name="password"
              type="password"
              error={showValidationErrors && Boolean(passwordError)}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {showValidationErrors && passwordError && (
              <ErrorInfo errorText={passwordError} />
            )}

            <Link to={ROUTES.forgotPassword} className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="formButton">
          <PrimaryButton title="Sign In" disabled={isLoading} />
        </div>

        <RedirectText
          to={ROUTES.signUp}
          text="Don’t have an account?"
          linkText="Sign up"
        />
      </form>
    </section>
  );
};
