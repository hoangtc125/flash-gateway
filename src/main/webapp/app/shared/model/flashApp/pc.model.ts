export interface IPc {
  id?: string;
  make?: string | null;
  model?: string | null;
  price?: number | null;
}

export const defaultValue: Readonly<IPc> = {};
