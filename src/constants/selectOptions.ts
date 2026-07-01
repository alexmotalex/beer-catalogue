export const selectOptions = [
  {
    title: 'Type',
    searchParamKey: 'beer_type',
    icon: 'type',
    filterBy: [
      { title: 'All', value: '' },
      {
        title: 'Dark',
        value: 'dark',
      },
      {
        title: 'Light',
        value: 'light',
      },
    ],
  },

  {
    title: 'ABV',
    searchParamKey: 'alcohol',
    icon: 'percent',
    filterBy: [
      { title: 'All', value: '' },
      {
        title: '4-6',
        value: '4-6',
      },
      {
        title: '6-8',
        value: '6-8',
      },
      {
        title: '8-plus',
        value: '8-plus',
      },
    ],
  },
  {
    title: 'Occassion',
    searchParamKey: 'event_type',
    icon: 'fire',
    filterBy: [
      { title: 'All', value: '' },
      {
        title: 'After Work',
        value: 'after-work',
      },
      {
        title: 'Weekend Escape',
        value: 'weekend-escape',
      },
      {
        title: 'Friends Over',
        value: 'friends-over',
      },
      {
        title: 'After Midnight',
        value: 'after-midnight',
      },
      {
        title: 'Dinner and Drinks',
        value: 'dinner-and-drinks',
      },
    ],
  },
  {
    title: 'Filtering',
    searchParamKey: 'filtered',
    icon: 'filter',
    filterBy: [
      { title: 'All', value: '' },
      {
        title: 'Filtered',
        value: 'true',
      },
      {
        title: 'Unfiltered ',
        value: 'false',
      },
    ],
  },
  {
    title: 'Sort by',
    searchParamKey: 'sort_by',
    icon: 'card',
    filterBy: [
      { title: 'All', value: '' },
      {
        title: 'Price',
        value: 'price',
      },
    ],
  },
  {
    title: 'Sort order',
    searchParamKey: 'sort_order',
    icon: 'sort',
    filterBy: [
      { title: 'All', value: '' },
      {
        title: 'High to low',
        value: 'desc',
      },
      {
        title: 'Low to high',
        value: 'asc',
      },
    ],
  },
];
