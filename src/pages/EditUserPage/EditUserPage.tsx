import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { mapToEditUserData } from '../../utils/formMappers';
import { validateEditUserForm } from '../../utils/formValidate/validateEditUserForm';
import { emptyEditUserForm } from '../../constants/formsData';
import type { EditUserFormData } from '../../types/Forms';
import { SuccessMessage } from '../../components/SuccessMessage';
import { ROUTES } from '../../constants/routes';
import styles from './EditUserPage.module.scss';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { ErrorInfo } from '../../components/ErrorInfo';

export const EditUserPage = () => {
  const { user, isLoading, editUser, serverErrors, setServerErrors } =
    useAuth();

  const [formData, setFormData] = useState<EditUserFormData>({
    firstName: capitalizeFirstLetter(user?.first_name) ?? '',
    lastName: capitalizeFirstLetter(user?.last_name) ?? '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const navigate = useNavigate();

  const validationErrors = validateEditUserForm(formData);

  const firstNameError = validationErrors.firstName || serverErrors.firstName;
  const lastNameError = validationErrors.lastName || serverErrors.lastName;

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
    setIsSuccess(false);

    const formIsInvalid = Object.keys(validationErrors).length > 0;

    if (formIsInvalid) {
      return;
    }

    const payload = mapToEditUserData(formData);

    const registrationSuccess = await editUser(payload);

    if (registrationSuccess) {
      setFormData(emptyEditUserForm);
      setShowValidationErrors(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.home);
      }, 2000);
    }
  };

  return (
    <section className="pageContent">
      {isSuccess && (
        <div className="successMessageWrapper">
          <SuccessMessage title="Success" />
        </div>
      )}

      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className={styles.title}>Personal Information</h1>

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
        </div>

        <div className="formButton">
          <PrimaryButton
            title={isLoading ? 'Saving changes...' : 'Save changes'}
            disabled={isLoading}
          />
        </div>
      </form>
    </section>
  );
};
