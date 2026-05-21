export type Beer = {
  id: number;
  name: string;
  price: string;
  image_url: string | null;
  alcohol_percentage: string;
  is_filtered: boolean;
  beer_type: string;
  volume: number;
  is_available: boolean;
};

export type BeerResponse = {
  beers: Beer[];
  next_offset: number;
};
