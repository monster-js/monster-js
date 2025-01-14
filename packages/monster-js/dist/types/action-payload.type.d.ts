export type ActionPayloadType<A> = A extends (state: any, payload: infer P) => any ? P : never;
