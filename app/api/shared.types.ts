
interface TResponseErrorMessageItem {
  [key: string]: Array<string>
}

export type TResponseError = {
  error: {
    code: number,
    message: TResponseErrorMessageItem[] | string;
  }
}

export type TTimes = {
  createdAt: string;
  updatedAt: string;
}
