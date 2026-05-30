export type Beer = {
  id: number;
  name: string;
  price: string;
  image_url: string;
  alcohol_percentage: string;
  is_filtered: boolean;
  beer_type: string;
  volume: number;
  is_available: boolean;
  description: string;
};

export type BeerResponse = {
  beers: Omit<Beer, 'description'>[];
  next_offset: number;
};
