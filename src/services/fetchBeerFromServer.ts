import type { BeerResponse } from '../types/Beer';
import { client } from '../utils/axiosClient';

export function fetchBeer() {
  return client.get<BeerResponse>('/beers');
}
