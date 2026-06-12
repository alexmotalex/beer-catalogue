import React, { useEffect, useState } from 'react';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { Checkbox } from '../../components/Checkbox';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { RedirectText } from '../../components/RedirectText';
import { FormErrorInfo } from '../../components/FormErrorInfo';
import { useAuth } from '../../hooks/useAuth';
import { validateSignUpForm } from '../../utils/validateSignUpForm';
import { mapToRegisterData } from '../../utils/mapToRegisterData';
import { ROUTES } from '../../constants/routes';
import { emptySignUpForm } from '../../constants/formsData';
import type { SignupFormData } from '../../types/Forms';
import styles from './SignUpPage.module.scss';
import { useNavigate } from 'react-router';

export const SignUpPage = () => {
  const [formData, setFormData] = useState<SignupFormData>(emptySignUpForm);

  const { register, isLoading, serverErrors, setServerErrors } = useAuth();
  const navigate = useNavigate();

  const validationErrors = validateSignUpForm(formData);
  const isFormValid = Object.keys(validationErrors).length === 0;

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

    const payload = mapToRegisterData(formData);

    const registrationSuccess = await register(payload);

    if (registrationSuccess) {
      setFormData(emptySignUpForm);
      navigate(ROUTES.checkEmail, {
        state: { email: formData.email, formData },
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

  useEffect(() => {
    setServerErrors({});
  }, [setServerErrors]);

  return (
    <section className="authPage">
      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className="authPageTitle">Sign Up</h1>

      <p className="authPageSubtitle">Create your personal account</p>

      <form className="authForm" onSubmit={handleSubmit}>
        <div className="authFormInputsWrapper">
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

          <div className="authFormLabelInputWrapper">
            <LabeledInput
              autoComplete="email"
              label="Email"
              name="email"
              type="email"
              error={Boolean(serverErrors.email)}
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@email.com"
              required
            />

            {serverErrors.email && (
              <FormErrorInfo errorText={serverErrors.email} />
            )}
          </div>

          <div className="authFormLabelInputWrapper">
            <LabeledInput
              autoComplete="new-password"
              label="Password"
              name="password"
              type="password"
              error={Boolean(serverErrors.password)}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {serverErrors.password && (
              <FormErrorInfo errorText={serverErrors.password} />
            )}

            {/* <span className={styles.passwordCondition}>
              At least 8 characters, including numbers
            </span> */}
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

        <div className="authFormButton">
          <PrimaryButton
            title={isLoading ? 'Signing Up...' : 'Sign Up'}
            type="submit"
            disabled={!isFormValid || isLoading}
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
