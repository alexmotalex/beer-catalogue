import { useState } from 'react';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { emptySignInForm } from '../../constants/formsData';
import type { AuthCredentials } from '../../types/User';
import { FormErrorInfo } from '../../components/FormErrorInfo';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { AuthRedirect } from '../../components/AuthRedirect';
import { ROUTES } from '../../constants/routes';
// import styles from './SignInPage.module.scss';

export const SigninPage = () => {
  const [formData, setFormData] = useState<AuthCredentials>(emptySignInForm);
  const isEmailErrorExists = false;
  const isPasswordErrorExists = false;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="authFormPage">
      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className="authFormPageTitle">Sign In</h1>

      <p className="authFormPageSubtitle">Continue to your personal account</p>

      <form className="authForm" onSubmit={handleSubmit}>
        <div className="authFormInputsWrapper">
          <div className="authFormLabelInputWrapper">
            <LabeledInput
              autoComplete="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@email.com"
              required
            />

            {isEmailErrorExists && (
              <FormErrorInfo errorText="No account found with this email address." />
            )}
          </div>

          <div className="authFormLabelInputWrapper">
            <LabeledInput
              autoComplete="current-password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {isPasswordErrorExists && (
              <FormErrorInfo errorText="Incorrect password. Please try again." />
            )}
          </div>
        </div>

        <div className="authFormButton">
          <PrimaryButton title="Sign In" type="submit" disabled={false} />
        </div>

        <AuthRedirect
          to={ROUTES.signUp}
          text="Don’t have an account?"
          linkText="Sign up"
        />
      </form>
    </section>
  );
};
