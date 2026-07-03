import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { InfoMessage } from '../../components/InfoMessage';
import { useAuth } from '../../hooks/useAuth';
import { mapToEditUserData } from '../../utils/formMappers';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { emptyEditUserForm } from '../../constants/formsData';
import { ROUTES } from '../../constants/routes';
import type { EditUserFormData } from '../../types/Forms';
import styles from './EditUserPage.module.scss';
import { Spinner } from '../../components/Spinner';

export const EditUserPage = () => {
  const { user, isLoading, editUser, serverErrors, setServerErrors } =
    useAuth();

  const [formData, setFormData] = useState<EditUserFormData>({
    firstName: capitalizeFirstLetter(user?.first_name) ?? '',
    lastName: capitalizeFirstLetter(user?.last_name) ?? '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

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
      }, 2000);
    }
  };

  return (
    <section className="pageContent">
      {isSuccess && (
        <div className="successMessageWrapper">
          <InfoMessage title="Success" />
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
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>

          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="family-name"
              label="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="formButton">
          <PrimaryButton
            title={isLoading ? 'Saving changes...' : 'Save changes'}
            disabled={isLoading}
            icon={isLoading ? <Spinner width={16} height={16} /> : undefined}
          />
        </div>
      </form>
    </section>
  );
};
