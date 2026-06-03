import React, { useState } from 'react';
import styles from './SignupPage.module.scss';
import type { SignupFormData } from '../../types/SignupFormData';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { Checkbox } from '../../components/Checkbox';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';

export const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: false,
    terms: false,
  });
  // const [errors, setErrors] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.firstName.trim()) {
  //     newErrors.firstName = 'Username is required.';
  //   }

  //   if (!formData.firstName.trim()) {
  //     newErrors.lastName = 'Username is required.';
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = 'Email is required.';
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = 'Please enter a valid email address.';
  //   }

  //   if (!formData.password) {
  //     newErrors.password = 'Password is required.';
  //   } else if (formData.password.length < 8) {
  //     newErrors.password = 'Password must be at least 8 characters.';
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = 'Passwords do not match.';
  //   }

  //   return newErrors;
  // };

  // const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent page refresh
  //   const validationErrors = validateForm();

  //   if (Object.keys(validationErrors).length === 0) {
  //     setErrors({});
  //     setIsSubmitted(true);
  //     console.log('Registration Data Submitted:', formData);
  //     // Integrate backend APIs or authentication calls here
  //   } else {
  //     setErrors(validationErrors);
  //     setIsSubmitted(false);
  //   }
  // };

  return (
    <section className={styles.signupPage}>
      <div className={styles.backButtonWrapper}>
        <BackButton />
      </div>

      <h1 className={styles.signupPageTitle}>Sign Up</h1>

      <p className={styles.signupPageSubtitle}>Create your personal account</p>

      <form className={styles.signupForm} onSubmit={() => {}}>
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

          <LabeledInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
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
            label="I agree to the terms and conditions"
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.checkboxButton}>
          <PrimaryButton
            title="Sign Up"
            type="submit"
            onClick={() => {}}
            disabled={false}
          />
        </div>
      </form>
    </section>
  );
};
