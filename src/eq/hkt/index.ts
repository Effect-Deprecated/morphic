import type { Eq } from "@matechs/core/Eq"

export const EqURI = "@matechs/morphic/EqURI" as const

export type EqURI = typeof EqURI

declare module "@matechs/morphic-alg/config" {
  export interface ConfigType<E, A> {
    [EqURI]: Eq<A>
  }
}

export class EqType<A> {
  _A!: A
  _URI!: EqURI
  constructor(public eq: Eq<A>) {}
}

declare module "@matechs/morphic-alg/utils/hkt" {
  interface URItoKind<R, A> {
    [EqURI]: (env: R) => EqType<A>
  }
}
