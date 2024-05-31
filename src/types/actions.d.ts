// export type CommonAction = { type: InfoType } | { type: VERIFICATION };

interface CommonAction<T> {
  type: T;
}
