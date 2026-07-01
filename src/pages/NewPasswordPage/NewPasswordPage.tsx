import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router';
import { Slide, toast } from 'react-toastify';
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
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { isLoading, serverErrors, setServerErrors, setNewPassword } =
    useAuth();

  const token = searchParams.get('token') || '';
  const validationErrors = validateNewPasswordForm(formData);
  const newPasswordError =
    validationErrors.password ||
    validationErrors.isSame ||
    serverErrors.password;
  const confirmPasswordError = validationErrors.confirmPassword;

  const notify = () =>
    toast.error(serverErrors.resetToken || 'Something went wrong', {
      position: 'top-right',
      theme: 'colored',
      transition: Slide,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShowValidationErrors(true);

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

    setShowValidationErrors(true);

    const formIsInvalid = Object.keys(validationErrors).length > 0;

    if (formIsInvalid) {
      return;
    }

    const { password } = formData;

    const success = await setNewPassword({ password, token });

    if (success) {
      setShowValidationErrors(false);

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
    <section className="pageContent">
      <h1 className="title">Create new password</h1>

      <p className="subtitle">Create a new password for your account</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="formInputsWrapper">
          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="new-password"
              label="New password"
              name="password"
              type="password"
              error={showValidationErrors && Boolean(newPasswordError)}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {showValidationErrors && newPasswordError && (
              <ErrorInfo errorText={newPasswordError} />
            )}
          </div>

          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="confirm-password"
              label="Confirm password"
              name="confirmPassword"
              type="password"
              error={showValidationErrors && Boolean(confirmPasswordError)}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {showValidationErrors && confirmPasswordError && (
              <ErrorInfo errorText={confirmPasswordError} />
            )}
          </div>
        </div>

        <div className="formButton">
          <PrimaryButton
            title="Reset password"
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </section>
  );
};
