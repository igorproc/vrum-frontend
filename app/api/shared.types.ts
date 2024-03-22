
interface TResponseErrorMessageItem {
  [key: string]: Array<string>
}

export type TResponseError = {
  error: {
    code: number,
    message: TResponseErrorMessageItem[] | string;
  }
}
