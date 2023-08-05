
export enum FilterEnum {
  Asc = 'asc',
  Desc = 'desc',
}

export interface IDropdownItem {
  label: string,
  value: FilterEnum,
}