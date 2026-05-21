import type { BeerResponse } from '../types/Beer';
import { client } from '../utils/axiosClient';

export const getBeer = () => {
  return client.get<BeerResponse>('/beers');
};
