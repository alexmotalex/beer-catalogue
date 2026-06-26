export const resolvePublicUrl = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
