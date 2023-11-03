import { SortProperty } from "../redux/filter/types";
import { Smartphone } from "../redux/smartphones/types";

export const sortItems = (items: Smartphone[] | CartItem[], isAsc: boolean, property: SortProperty) => {
    return items.sort((a, b) => {
      const k = isAsc ? 1 : -1;

        if (a[property] < b[property]) {
          return -1 * k;
        }
        if (a[property] > b[property]) {
          return 1 * k;
        }
        return 0;
    });
}