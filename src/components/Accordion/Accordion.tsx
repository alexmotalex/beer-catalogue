import { useState } from 'react';
import { Icon } from '../Icon';
import { Divider } from '../Divider';
import styles from './Accordion.module.scss';
import clsx from 'clsx';

type Props = {
  question: string;
  answer: string;
};

export const Accordion: React.FC<Props> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx(styles.accordion, isOpen && styles.accordionOpen)}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span className={styles.question}>{question}</span>
        <div className={styles.icon}>
          <Icon name="arrow-down" />
        </div>
      </button>

      <div className={styles.answerWrapper}>
        <Divider />
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
};
