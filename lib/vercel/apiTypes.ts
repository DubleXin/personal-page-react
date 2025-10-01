export type Req = {
  method?: string;
  body?: {
    title?: string;
    description?: string;
    imgUrl?: string;
  };
};

export type Res = {
  status: (code: number) => Res;
  json: (data: unknown) => void;
};
