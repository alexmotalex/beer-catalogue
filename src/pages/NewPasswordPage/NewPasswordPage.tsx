import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router';
import { Slide, toast } from 'react-toastify';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { ErrorInfo } from '../../components/ErrorInfo';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { validateNewPasswordForm } from '../../utils/formValidate/validateNewPasswordForm';
import { emptyNewPasswordForm } from '../../constants/formsData';
import { ROUTES } from '../../constants/routes';
import type { NewPasswordFormData } from '../../types/Forms';
// import styles from './NewPasswordPage.module.scss';

export const NewPasswordPage = () => {
  const [formData, setFormData] =
    useState<NewPasswordFormData>(emptyNewPasswordForm);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, serverErrors, setServerErrors, setNewPassword } =
    useAuth();

  const token = searchParams.get('token') || '';
  const validationErrors = validateNewPasswordForm(formData);
  const isFormValid = Object.keys(validationErrors).length === 0;
  const notify = () =>
    toast.error(serverErrors.resetToken || 'Something went wrong', {
      position: 'top-right',
      theme: 'colored',
      transition: Slide,
    });

  console.log(validationErrors);
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

    if (!token) {
      return <Navigate to={ROUTES.signIn} replace />;
    }

    const { password } = formData;

    const success = await setNewPassword({ password, token });

    if (success) {
      navigate(ROUTES.signIn);
    } else {
      {
        notify();
      }
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

      <h1 className="title">Create new password</h1>

      <p className="subtitle">Create a new password for your account</p>

      <form className="authForm" onSubmit={handleSubmit}>
        <div className="authFormInputsWrapper">
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
              <ErrorInfo errorText={serverErrors.password} />
            )}
          </div>

          <div className="authFormLabelInputWrapper">
            <LabeledInput
              autoComplete="confirm-password"
              label="Password"
              name="confirmPassword"
              type="password"
              error={Boolean(validationErrors.isSame)}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {validationErrors.isSame && (
              <ErrorInfo errorText={validationErrors.isSame} />
            )}
          </div>
        </div>

        <div className="authFormButton">
          <PrimaryButton
            title="Reset password"
            type="submit"
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>
    </section>
  );
};
