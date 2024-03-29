// ets_tracing: off

import { getApplyConfig } from "../../HKT/index.js"

export const GuardURI = "GuardURI" as const

export type GuardURI = typeof GuardURI

export interface Guard<A> {
  is: (u: unknown) => u is A
}

export const guardApplyConfig = getApplyConfig(GuardURI)

declare module "../../HKT/index.js" {
  interface ConfigType<E, A> {
    [GuardURI]: Guard<A>
  }
  interface URItoKind<R, E, A> {
    [GuardURI]: (env: R) => GuardType<A>
  }
}

export class GuardType<A> {
  _A!: A
  _URI!: GuardURI
  constructor(public guard: Guard<A>) {}
}
