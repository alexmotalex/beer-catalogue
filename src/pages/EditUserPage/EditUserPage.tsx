import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { mapToEditUserData } from '../../utils/formMappers';
import { validateEditUserForm } from '../../utils/validateEditUserForm';
import { emptyEditUserForm } from '../../constants/formsData';
import type { EditUserFormData } from '../../types/Forms';
import { SuccessMessage } from '../../components/SuccessMessage';
import { ROUTES } from '../../constants/routes';
import styles from './EditUserPage.module.scss';

export const EditUserPage = () => {
  const [formData, setFormData] = useState<EditUserFormData>(emptyEditUserForm);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const { isLoading, editUser, serverErrors, setServerErrors } = useAuth();

  const validationErrors = validateEditUserForm(formData);
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
    setIsSuccess(false);

    const payload = mapToEditUserData(formData);

    const registrationSuccess = await editUser(payload);

    if (registrationSuccess) {
      setFormData(emptyEditUserForm);
      setIsSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.home);
      }, 3000);
    }
  };

  return (
    <section className="checkAuthPage">
      {isSuccess && (
        <div className="successMessageWrapper">
          <SuccessMessage title="Success" />
        </div>
      )}

      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <h1 className={styles.title}>Personal Information</h1>

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
        </div>

        <div className="authFormButton">
          <PrimaryButton
            title={isLoading ? 'Saving changes...' : 'Save changes'}
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>
    </section>
  );
};
