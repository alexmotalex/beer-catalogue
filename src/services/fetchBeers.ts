import type { BeerResponse } from '../types/Beer';
import { client } from '../utils/axiosClient';

export function fetchBeers(offset?: number) {
  const searchParams = new URLSearchParams();

  if (offset !== undefined) {
    searchParams.set('offset', String(offset));
  }

  return client.get<BeerResponse>(`beers/?${searchParams.toString()}`);
}

// export function fetchBeers(offset?: number) {
//   const searchParams = new URLSearchParams();

//   if (offset !== undefined) {
//     searchParams.set('offset', String(offset));
//   }

//   return client.get<BeerResponse>(`api/beers.json`);
// }
