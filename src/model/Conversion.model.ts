export interface Conversion {
  rates: Rate[] | undefined;
}

export interface Rate {
  currency: string;
  code: string;
  rate: number;
}
