export type ActionPayloadType<A> = A extends (
  state: unknown,
  payload: infer P,
) => unknown ? P : never;
