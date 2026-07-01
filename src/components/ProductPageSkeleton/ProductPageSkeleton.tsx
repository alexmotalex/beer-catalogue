import styles from './ProductPageSkeleton.module.scss';

export const ProductPageSkeleton = () => {
  return (
    <section className={styles.product}>
      <div className={styles.overall}>
        <div className={styles.image} />

        <section className={styles.about}>
          <div className={styles.detail}>
            <div className={styles.info}>
              <div className={styles.barrel} />
              <div className={styles.title} />
              <div className={styles.price} />
            </div>

            <div className={styles.description}>
              <div className={styles.lineLong} />
              <div className={styles.lineMedium} />
              <div className={styles.lineShort} />

              <div className={styles.occasions}>
                <div className={styles.occasion} />
                <div className={styles.occasion} />
                <div className={styles.occasion} />
              </div>
            </div>

            <div className={styles.specifications}>
              <div className={styles.specificationsTitle} />

              <div className={styles.specificationsList}>
                <div className={styles.specificationItem} />
                <div className={styles.specificationItem} />
                <div className={styles.specificationItem} />
                <div className={styles.specificationItem} />
              </div>
            </div>
          </div>

          <div className={styles.button} />
        </section>
      </div>
    </section>
  );
};
