const NAME_REGEX =
  /^(?!-)(?!.*[ '-]{2})(?=(?:.*[A-Za-z]){2,})[A-Za-z '-]+(?<![ -])$/;

export const validateName = (
  name: string,
  field: 'First name' | 'Last name',
): string => {
  if (!name.trim()) {
    return `${field} is required.`;
  }

  if (name.trim().length < 2) {
    return `${field} must be at least 2 characters.`;
  }

  if (!NAME_REGEX.test(name.trim())) {
    if (/^-/.test(name)) {
      return `${field} cannot start with a hyphen.`;
    }

    if (/[-]$/.test(name)) {
      return `${field} cannot end with a hyphen.`;
    }

    if (/[ '-]{2}/.test(name)) {
      return `${field} cannot contain two consecutive special characters.`;
    }

    return `${field} can only contain letters, hyphens, apostrophes, and spaces.`;
  }

  return '';
};
