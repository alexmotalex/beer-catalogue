// import styles from './NotFoundPage.module.scss';

import { NotFound } from '../../components/NotFound';
import emptySearchLogo from '../../assets/images/empty-search.png';

export const NotFoundPage = () => {
  return (
    <section className="pagecontent">
      <NotFound
        logo={emptySearchLogo}
        title="Page not found"
        subtitle="The page you're looking for doesn't exist. Start exploring the catalogue."
        buttonTitle="Explore catalogue"
      />
    </section>
  );
};
