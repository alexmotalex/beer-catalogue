import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export const formatOccasions = (events: string[]): string[] => {
  if (!Array.isArray(events)) {
    return [];
  }

  return events.map(event =>
    event
      .split('-')
      .map(word => capitalizeFirstLetter(word))
      .join(' '),
  );
};
