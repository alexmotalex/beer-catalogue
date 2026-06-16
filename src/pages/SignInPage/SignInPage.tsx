import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { ErrorInfo } from '../../components/ErrorInfo';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { RedirectText } from '../../components/RedirectText';
import { useAuth } from '../../hooks/useAuth';
import { validateSignInForm } from '../../utils/validateSignInForm';
import { emptySignInForm } from '../../constants/formsData';
import { ROUTES } from '../../constants/routes';
import type { AuthCredentials } from '../../types/User';
import styles from './SignInPage.module.scss';

export const SigninPage = () => {
  const [formData, setFormData] = useState<AuthCredentials>(emptySignInForm);

  const navigate = useNavigate();

  const { login, isLoading, serverErrors, setServerErrors } = useAuth();

  const validationErrors = validateSignInForm(formData);
  const isFormValid = Object.keys(validationErrors).length === 0;

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

    const loginSuccess = await login(formData);

    if (loginSuccess) {
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

      <h1 className="authPageTitle">Sign In</h1>

      <p className="authPageSubtitle">Continue to your personal account</p>

      <form className="authForm" onSubmit={handleSubmit}>
        <div className="authFormInputsWrapper">
          <div className="authFormLabelInputWrapper">
            <LabeledInput
              autoComplete="email"
              label="Email"
              name="email"
              type="email"
              error={!!serverErrors.email}
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@email.com"
              required
            />

            {serverErrors.email && <ErrorInfo errorText={serverErrors.email} />}
          </div>

          <div className="authFormLabelInputWrapper">
            <LabeledInput
              autoComplete="current-password"
              label="Password"
              name="password"
              type="password"
              error={!!serverErrors.password}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {serverErrors.password && (
              <ErrorInfo errorText={serverErrors.password} />
            )}

            <Link to="./" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="authFormButton">
          <PrimaryButton title="Sign In" disabled={!isFormValid || isLoading} />
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
