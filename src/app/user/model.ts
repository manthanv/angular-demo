export interface User {
  name: string;
  language: string;
  id: string;
  bio: string;
  version: string;
}

export type FieldType = 'name' | 'language' | 'id' | 'bio' | 'version';

export interface ActiveTableCell {
  rowIndex: number;
  field: FieldType;
}
