import { Accordion } from '../../components/Accordion';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { Divider } from '../../components/Divider';
import { faqItems } from '../../constants/faqItems';
import styles from './HelpCenterPage.module.scss';

const handleSupportClick = () => {
  const email = 'support@yourdomain.com';
  const subject = encodeURIComponent('Support Request');
  const body = encodeURIComponent('Hello Support Team,\n\nI need help with...');

  // Triggers the user's email client
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};

export const HelpCenterPage = () => {
  return (
    <section className="pageContent">
      <h1 className="authPageTitle">help center</h1>

      <p className="subtitle">Find answers to the most common questions</p>

      <div className={styles.helpContent}>
        <ul className={styles.questionsWrapper}>
          {faqItems.map(item => (
            <li key={item.question}>
              <Accordion question={item.question} answer={item.answer} />
            </li>
          ))}
        </ul>

        <div className={styles.helpDivider}>
          <Divider />
          <div className={styles.helpDividerLogo} />
          <Divider />
        </div>

        <div className={styles.supportContent}>
          <h2 className="title">Still have questions?</h2>

          <p className="subtitle">
            Can’t find the answers you’re looking for? <br /> Our support team
            is ready to help.
          </p>

          <div className={styles.supportContentButton}>
            <PrimaryButton
              type="button"
              title="Contact Support"
              onClick={handleSupportClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
