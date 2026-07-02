import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { Checkbox } from '../../components/Checkbox';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SlowServerMessage } from '../../components/SlowServerMessage';
import { RedirectText } from '../../components/RedirectText';
import { ErrorInfo } from '../../components/ErrorInfo';
import { useSlowLoad } from '../../hooks/useSlowLoad';
import { useAuth } from '../../hooks/useAuth';
import { validateSignUpForm } from '../../utils/formValidate/validateSignUpForm';
import { mapToRegisterData } from '../../utils/formMappers';
import { ROUTES } from '../../constants/routes';
import { emptySignUpForm } from '../../constants/formsData';
import type { SignupFormData } from '../../types/Forms';
import styles from './SignUpPage.module.scss';

export const SignUpPage = () => {
  const [formData, setFormData] = useState<SignupFormData>(emptySignUpForm);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const navigate = useNavigate();
  const { register, isLoading, serverErrors, setServerErrors } = useAuth();
  const isSlow = useSlowLoad(isLoading);

  const validationErrors = validateSignUpForm(formData);

  const passwordError = validationErrors.password || serverErrors.password;
  const firstNameError = validationErrors.firstName || serverErrors.firstName;
  const lastNameError = validationErrors.lastName || serverErrors.lastName;
  const emailError = validationErrors.email || serverErrors.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setServerErrors({
      ...serverErrors,
      [name]: undefined,
    });

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowValidationErrors(true);

    const formIsInvalid = Object.keys(validationErrors).length > 0;

    if (formIsInvalid) {
      return;
    }

    const payload = mapToRegisterData(formData);

    const registrationSuccess = await register(payload);

    if (registrationSuccess) {
      setFormData(emptySignUpForm);
      setShowValidationErrors(false);

      navigate(ROUTES.checkEmail, {
        state: { email: formData.email, formData, type: 'register' },
      });
    }
  };

  const agreeLabel = (
    <RedirectText
      to={ROUTES.terms}
      text="I agree to"
      linkText="Terms & Conditions"
    />
  );

  return (
    <section className="authPage">
      <div className="backButtonWrapper">
        <BackButton />
      </div>

      {isSlow && <SlowServerMessage />}

      <h1 className="authPageTitle">Sign Up</h1>

      <p className="subtitle">Create your personal account</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="formInputsWrapper">
          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="given-name"
              label="First name"
              name="firstName"
              error={showValidationErrors && Boolean(firstNameError)}
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />

            {showValidationErrors && firstNameError && (
              <ErrorInfo errorText={firstNameError} />
            )}
          </div>

          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="family-name"
              label="Last name"
              name="lastName"
              error={showValidationErrors && Boolean(lastNameError)}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />

            {showValidationErrors && lastNameError && (
              <ErrorInfo errorText={lastNameError} />
            )}
          </div>
          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="email"
              label="Email"
              name="email"
              type="email"
              error={showValidationErrors && Boolean(emailError)}
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
              autoComplete="new-password"
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
          </div>
        </div>

        <div className={styles.checkboxesWrapper}>
          <div className="formLabelInputWrapper">
            <Checkbox
              label="I confirm that I am at least 18 years old"
              name="age"
              type="checkbox"
              checked={formData.age}
              onChange={handleChange}
            />

            {showValidationErrors && validationErrors.age && (
              <ErrorInfo errorText={validationErrors.age} />
            )}
          </div>

          <div className="formLabelInputWrapper">
            <Checkbox
              label={agreeLabel}
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
            />

            {showValidationErrors && validationErrors.terms && (
              <ErrorInfo errorText={validationErrors.terms} />
            )}
          </div>
        </div>

        <div className="formButton">
          <PrimaryButton
            title={isLoading ? 'Signing Up...' : 'Sign Up'}
            disabled={isLoading}
            type="submit"
          />
        </div>

        <RedirectText
          to={ROUTES.signIn}
          text="Already registered?"
          linkText="Sign In"
        />
      </form>
    </section>
  );
};
