import React, { useMemo, useState } from 'react';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { Checkbox } from '../../components/Checkbox';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { validateForm } from '../../utils/validateForm';
import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import type { SignupFormData } from '../../types/Forms';
import styles from './SignupPage.module.scss';

export const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: false,
    terms: false,
  });
  // const [errors, setErrors] = useState<SignupFormErrors>({});
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setIsSubmitted(true);
      console.log('Registration Data Submitted:', formData);
      // Integrate backend APIs or authentication calls here
    } else {
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.length >= 8 &&
      formData.age === true &&
      formData.terms === true
    );
  }, [formData]);

  const agreeLabel = (
    <>
      I agree to{' '}
      <Link to={ROUTES.terms} className={styles.formLink}>
        Terms & Conditions
      </Link>
    </>
  );

  return (
    <section className={styles.signupPage}>
      <div className={styles.backButtonWrapper}>
        <BackButton />
      </div>

      <h1 className={styles.signupPageTitle}>Sign Up</h1>

      <p className={styles.signupPageSubtitle}>Create your personal account</p>

      <form
        className={styles.signupForm}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className={styles.inputsWrapper}>
          <LabeledInput
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />

          <LabeledInput
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
          />

          <LabeledInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@email.com "
            required
          />

          <div className={styles.passwordWrapper}>
            <LabeledInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

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
            title="Sign Up"
            type="submit"
            disabled={!isFormValid}
          />
        </div>

        <div className={styles.bottomText}>
          <span className={styles.alreadyRegistered}>
            Already registered?{' '}
            <Link to={ROUTES.signIn} className={styles.formLink}>
              Sign In
            </Link>{' '}
          </span>
        </div>
      </form>
    </section>
  );
};
