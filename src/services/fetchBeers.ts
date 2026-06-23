import type { BeerResponse } from '../types/Beer';
import { client } from '../utils/axiosClient';

export function fetchBeers(searchParams: URLSearchParams, offset?: number) {
  const params = new URLSearchParams(searchParams);

  if (offset !== undefined) {
    params.set('offset', String(offset));
  }

  return client.get<BeerResponse>(`beers/?${params.toString()}`);
}
