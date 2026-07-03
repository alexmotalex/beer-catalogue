const NAME_REGEX =
  /^(?!-)(?!.*[ '-]{2})(?=(?:.*[A-Za-z]){2,})[A-Za-z '-]+(?<![ -])$/;

export const validateName = (
  name: string,
  field: 'First name' | 'Last name',
): string => {
  if (!name.trim()) {
    return '';
  }

  if (!NAME_REGEX.test(name.trim())) {
    if (/^-/.test(name.trim())) {
      return `${field} cannot start with a hyphen.`;
    }

    if (/[ -]$/.test(name.trim())) {
      return `${field} cannot end with a space or hyphen.`;
    }

    if (/[ '-]{2}/.test(name.trim())) {
      return `${field} cannot contain two consecutive special characters.`;
    }

    return `${field} must contain only Latin letters, spaces, hyphens, and apostrophes, and must be at least 2 letters long.`;
  }

  return '';
};
