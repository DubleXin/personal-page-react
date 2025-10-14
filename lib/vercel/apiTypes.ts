export type Req<T = unknown> = {
  method?: string;
  body?: T;
};

export type Res = {
  status: (code: number) => Res;
  json: (data: unknown) => void;
};
