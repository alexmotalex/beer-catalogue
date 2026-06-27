import { BackButton } from '../../components/Buttons/BackButton';
import { LabeledInput } from '../../components/LabeledInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { InfoMessage } from '../../components/InfoMessage';

// import styles from './NewPasswordPage.module.scss';

export const ChangePasswordPage = () => {
  return (
    <section className="pageContent">
      <div className="backButtonWrapper">
        <BackButton />
      </div>

      <div className="successMessageWrapper">
        <InfoMessage
          title="This feature is currently under development. We are working hard to bring this to you soon! Check back later for updates."
          icon="close"
        />
      </div>

      <h1 className="title">Change password</h1>

      <p className="subtitle">Create a new password for your account</p>

      <div className="form">
        <div className="formInputsWrapper">
          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="current-password"
              label="Current password"
              name="password"
              type="password"
              onChange={() => {}}
              value=""
              placeholder="••••••••"
            />
          </div>

          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="new-password"
              label="New password"
              name="password"
              type="password"
              onChange={() => {}}
              value=""
              placeholder="••••••••"
            />
          </div>

          <div className="formLabelInputWrapper">
            <LabeledInput
              autoComplete="confirm-password"
              label="Confirm password"
              name="confirmPassword"
              type="password"
              onChange={() => {}}
              value=""
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="formButton">
          <PrimaryButton title="Reset password" type="submit" />
        </div>
      </div>
    </section>
  );
};
