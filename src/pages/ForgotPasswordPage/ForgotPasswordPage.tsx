import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { ErrorInfo } from '../../components/ErrorInfo';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { RedirectText } from '../../components/RedirectText';
import { useAuth } from '../../hooks/useAuth';
import { emptyForgotPasswordForm } from '../../constants/formsData';
import { ROUTES } from '../../constants/routes';
import { validateForgotPasswordForm } from '../../utils/formValidate/validateForgotPasswordForm';
import type { ForgotPasswordFormData } from '../../types/Forms';

export const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>(
    emptyForgotPasswordForm,
  );

  const navigate = useNavigate();

  const { isLoading, serverErrors, passwordReset, setServerErrors } = useAuth();

  const validationErrors = validateForgotPasswordForm(formData);
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

    const registrationSuccess = await passwordReset(formData);

    if (registrationSuccess) {
      setFormData(emptyForgotPasswordForm);
      navigate(ROUTES.checkEmail, {
        state: {
          email: formData.email,
          formData,
          type: 'reset-password',
        },
      });
    }
  };

  useEffect(() => {
    setServerErrors({});
  }, [setServerErrors]);

  return (
    <section className="checkAuthPage">
      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className="title">Forgot Password?</h1>

      <p className="subtitle">Receive a code to reset your password</p>

      <form className="authForm" onSubmit={handleSubmit}>
        <div className="authFormInputsWrapper">
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

            {serverErrors.email && <ErrorInfo errorText={serverErrors.email} />}
          </div>
        </div>

        <div className="authFormButton">
          <PrimaryButton
            title="Send сode"
            disabled={!isFormValid || isLoading}
          />
        </div>

        <RedirectText
          to={ROUTES.signIn}
          text="Remember password?"
          linkText="Back to Sign In"
        />
      </form>
    </section>
  );
};
