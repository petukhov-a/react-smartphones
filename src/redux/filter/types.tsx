export interface FilterSliceState {
  prices: FilterPrices;
  internalStorage: string[];
  ram: string[];
  brand: string[];
  screenType: string[];
  searchValue: string;
  sort: Sort,
}

export interface Sort {
  property: SortProperty,
  title?: string,
  mobileTitle?: string,
  isAsc?: boolean,
}

export interface FilterSetType {
  propertyName: FilterName;
  filterValue: string;
}

export type SortProperty = 'price' | 'rating' | 'name';

export type FilterName = 'internalStorage' | 'ram' | 'brand' | 'screenType';

export type FilterPrices = [number, number];