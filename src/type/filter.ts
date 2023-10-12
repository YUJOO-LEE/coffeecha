
export enum FilterEnum {
  Asc = 'asc',
  Desc = 'desc',
}

export interface DropdownItem {
  label: string,
  value: FilterEnum,
}