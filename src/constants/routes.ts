export const ROUTES = {
  home: '/',
  account: '/account',
  signIn: '/signin',
  signUp: '/signup',
  help: '/help',
  beers: '/beers',
  cart: '/cart',
  productPage: '/product/:productId',
  faq: '/',
  about: '/about',
  contact: '/',
  delivery: '/',
  accessibility: '/',
  privacy: '/',
  terms: '/',
  cookie: '/',
  responsibility: '/',
  facebook: '/',
  instagram: '/',
  x: '/',
} as const;

export const HIDDEN_ROUTES = [ROUTES.signUp, ROUTES.signIn] as const;
