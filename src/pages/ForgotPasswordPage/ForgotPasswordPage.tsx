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
import { Spinner } from '../../components/Spinner';

export const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>(
    emptyForgotPasswordForm,
  );

  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const navigate = useNavigate();

  const { isLoading, serverErrors, passwordReset, setServerErrors } = useAuth();

  const validationErrors = validateForgotPasswordForm(formData);
  const emailError = validationErrors.email || serverErrors.email;

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

    const registrationSuccess = await passwordReset(formData);

    if (registrationSuccess) {
      setFormData(emptyForgotPasswordForm);
      setShowValidationErrors(false);

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
    <section className="pageContent">
      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className="title">Forgot Password?</h1>

      <p className="subtitle">Receive a code to reset your password</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="formInputsWrapper">
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
        </div>

        <div className="formButton">
          <PrimaryButton
            title={isLoading ? 'Sending сode..' : 'Send сode'}
            disabled={isLoading}
            icon={isLoading ? <Spinner width={16} height={16} /> : undefined}
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
