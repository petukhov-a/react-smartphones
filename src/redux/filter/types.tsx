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
  property: string,
  name: string,
  isAsc?: boolean,
}

export interface FilterSetType {
  propertyName: FilterName;
  filterValue: string;
}

export type FilterName = 'internalStorage' | 'ram' | 'brand' | 'screenType';

export type FilterPrices = [number, number];