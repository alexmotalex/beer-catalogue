import clsx from 'clsx';

export function createNavLinkClass<T extends Record<string, string>>(
  styles: T,
  baseKey: keyof T,
) {
  return ({ isActive }: { isActive: boolean }) =>
    clsx(styles[baseKey], {
      [styles[`${String(baseKey)}IsActive`]]: isActive,
    });
}
