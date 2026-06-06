import React, { useState } from 'react';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { Checkbox } from '../../components/Checkbox';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SuccessMessage } from '../../components/SuccessMessage';
import { Icon } from '../../components/Icon';
import { AuthRedirect } from '../../components/AuthRedirect';
import { useAuth } from '../../hooks/useAuth';
import { validateForm } from '../../utils/validateForm';
import { mapToRegisterData } from '../../utils/mapToRegisterData';
import { scrollToTop } from '../../utils/scrollToTop';
import { ROUTES } from '../../constants/routes';
import { emptySignUpForm } from '../../constants/formsData';
import type { SignupFormData, SignupFormErrors } from '../../types/Forms';
import styles from './SignupPage.module.scss';

export const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>(emptySignUpForm);
  const [formErrors, setFormErrors] = useState<SignupFormErrors>({});

  const {
    register,
    isLoading,
    isSuccess,
    submitError,
    setSubmitError,
    setIsSuccess,
  } = useAuth();

  const validationErrors = validateForm(formData);
  const isFormValid = Object.keys(validationErrors).length === 0;
  const isEmailErrorExists =
    submitError === 'User with this email already exists.';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setIsSuccess(false);

    if (name === 'email' && submitError) {
      setSubmitError('');
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setFormErrors(validationErrors);

      return;
    }

    setFormErrors({});

    const payload = mapToRegisterData(formData);

    const registrationSuccess = await register(payload);

    if (registrationSuccess) {
      setFormData(emptySignUpForm);
      scrollToTop();
    }
  };

  const agreeLabel = (
    <AuthRedirect
      to={ROUTES.terms}
      text="I agree to"
      linkText="Terms & Conditions"
    />
  );

  return (
    <section className={styles.signupPage}>
      <div className={styles.backButtonWrapper}>
        <BackButton />
      </div>

      {isSuccess && (
        <div className={styles.successMessageWrapper}>
          <SuccessMessage title="User created. Please check your email." />
        </div>
      )}

      <h1 className={styles.signupPageTitle}>Sign Up</h1>

      <p className={styles.signupPageSubtitle}>Create your personal account</p>

      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.inputsWrapper}>
          <LabeledInput
            autoComplete="given-name"
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />

          <LabeledInput
            autoComplete="family-name"
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
          />

          <div className={styles.labelInputWrapper}>
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
              <div className={styles.inputErrorWrapper}>
                <Icon name="error" size={14} />
                <span className={styles.errorText}>
                  An accoutn with this email already exists.
                </span>
              </div>
            )}
          </div>

          <div className={styles.labelInputWrapper}>
            <LabeledInput
              autoComplete="new-password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {formErrors.password && (
              <div className={styles.inputErrorWrapper}>
                <Icon name="error" size={14} />
                <span className={styles.errorText}>{formErrors.password}</span>
              </div>
            )}

            <span className={styles.passwordCondition}>
              At least 8 characters, including numbers
            </span>
          </div>
        </div>

        <div className={styles.checkboxesWrapper}>
          <Checkbox
            label="I confirm that I am at least 18 years old"
            name="age"
            type="checkbox"
            checked={formData.age}
            onChange={handleChange}
            required
          />

          <Checkbox
            label={agreeLabel}
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.submitButton}>
          <PrimaryButton
            title={isLoading ? 'Signing Up...' : 'Sign Up'}
            type="submit"
            disabled={!isFormValid || isLoading}
          />
        </div>

        <AuthRedirect
          to={ROUTES.signIn}
          text="Already registered?"
          linkText="Sign In"
        />
      </form>
    </section>
  );
};
