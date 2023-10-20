export interface FilterSliceState {
  prices: FilterPrices;
  internalStorage: string[];
  ram: string[];
  brand: string[];
  screenType: string[];
  searchValue: string;
}

export interface FilterSetType {
  propertyName: FilterName;
  filterValue: string;
}

export type FilterName = 'internalStorage' | 'ram' | 'brand' | 'screenType';

export type FilterPrices = [number, number];