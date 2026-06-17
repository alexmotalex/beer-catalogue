import { ROUTES } from './routes';

export const HEADER_MAIN_LINKS = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.catalogue, label: 'Catalogue' },
  { to: ROUTES.about, label: 'About Us' },
] as const;

export const FOOTER_SUPPORTS_LINKS = [
  { to: ROUTES.faq, label: 'FAQ' },
  { to: ROUTES.contact, label: 'Contact' },
  { to: ROUTES.delivery, label: 'Delivery & Returns' },
  { to: ROUTES.accessibility, label: 'Accessibility' },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { to: ROUTES.privacy, label: 'Privacy Policy' },
  { to: ROUTES.terms, label: 'Terms of Service' },
  { to: ROUTES.cookie, label: 'Cookie Policy' },
  { to: ROUTES.responsibility, label: 'Responsibility' },
] as const;

export const FOOTER_SOCIAL_LINKS = [
  { to: ROUTES.facebook, label: 'Facebook', name: 'facebook' },
  { to: ROUTES.instagram, label: 'Instagram', name: 'instagram' },
  { to: ROUTES.x, label: 'X', name: 'x' },
] as const;
