export type OverrideProps<T, TOverriden> = Omit<T, keyof TOverriden> &
  TOverriden
