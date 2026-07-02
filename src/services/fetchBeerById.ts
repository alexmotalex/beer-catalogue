import type { Beer } from '../types/Beer';
import { client } from '../utils/axiosClient';

export function fetchBeerById(id: number) {
  return client.get<Beer>(`beers/${id}/`);
}
