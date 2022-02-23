// ets_tracing: off

import { getApplyConfig } from "../../HKT/index.js"

export interface TypeHash {
  typeHash: string
}

export const TypeHashURI = "HashURI" as const
export type TypeHashURI = typeof TypeHashURI

export const typeHashApplyConfig = getApplyConfig(TypeHashURI)

declare module "../../HKT/index.js" {
  interface ConfigType<E, A> {
    [TypeHashURI]: TypeHash
  }
  interface URItoKind<R, E, A> {
    [TypeHashURI]: (env: R) => HashType<A>
  }
}

export class HashType<A> {
  _A!: A
  _URI!: TypeHashURI
  constructor(public typeHash: TypeHash) {}
}
