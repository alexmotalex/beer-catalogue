import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { ProductCard } from '../../components/ProductCard';
import { SlowServerMessage } from '../../components/SlowServerMessage';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { useBeers } from '../../hooks/useBeers';
import { useSlowLoad } from '../../hooks/useSlowLoad';
import { getUniqueRandoms } from '../../utils/getThreeUniqueRandoms';
import { beerDescriptions } from '../../constants/beerDescriptions';
import { storyParagraphs } from '../../constants/storyParagraphs';
import { ROUTES } from '../../constants/routes';
import styles from './HomePage.module.scss';
import { Toast } from '../../components/Toast';

export const HomePage = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState('tick');
  const { beers, isLoading } = useBeers();
  const navigate = useNavigate();
  const isSlow = useSlowLoad(isLoading);

  const picksBeers = useMemo(() => {
    return getUniqueRandoms(beers, 3);
  }, [beers]);

  const handleOpenCatalogue = () => {
    navigate(ROUTES.catalogue);
  };

  const renderContent = () => {
    if (isLoading && beers.length === 0) {
      return (
        <>
          <ul className={styles.picksList}>
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className={styles.picksItem}>
                <ProductCardSkeleton />
              </li>
            ))}
          </ul>
        </>
      );
    }

    if (beers.length === 0) {
      return <div>No beers found</div>;
    }

    return (
      <ul className={styles.picksList}>
        {picksBeers.map(beer => (
          <li key={beer.id} className={styles.picksItem}>
            <ProductCard
              product={beer}
              setToast={setToast}
              setToastIcon={setToastIcon}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.homePage}>
      <section className={styles.brew}>
        {toast && (
          <Toast
            title={toast}
            onClose={() => setToast(null)}
            icon={toastIcon}
          />
        )}
        <div className={styles.brewContent}>
          <div className={styles.brewTextContent}>
            <h1 className={styles.brewTitleSmall}>
              Small batches.
              <span className={styles.brewTitleLarge}>Big personality.</span>
            </h1>

            <p className={styles.brewDescription}>
              Small-batch brews with bold character, crafted for those who value
              real taste over mass production.
            </p>
          </div>

          <div className={styles.brewButtonWrapper}>
            <PrimaryButton
              type="button"
              title="Browse beers"
              onClick={handleOpenCatalogue}
            />
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <span className={styles.storyYear}>1776</span>

          <h2 className={styles.storyTitle}>Our Story</h2>

          <div className={styles.storyText}>
            {storyParagraphs.map(p => (
              <p key={p.id} className={styles.storyParagraph}>
                {p.paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.storyImage} aria-hidden="true" />
      </section>

      <section className={styles.description}>
        {beerDescriptions.map((d, index) => (
          <React.Fragment key={d.id}>
            <div className={styles.descriptionBlock}>
              <span className={styles.descriptionNumber}>{d.id}</span>
              <h3 className={styles.descriptionTitle}>{d.title}</h3>
              <p className={styles.descriptionText}>{d.text}</p>
            </div>

            {index < beerDescriptions.length - 1 && (
              <div className={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </section>

      <section className={styles.picks}>
        <h2 className={styles.picksTitle}>Our Picks</h2>

        {isSlow && <SlowServerMessage />}

        {renderContent()}

        <div className={styles.picksButton}>
          <SecondaryButton
            type="button"
            title="View all"
            onClick={handleOpenCatalogue}
          />
        </div>
      </section>
    </div>
  );
};
