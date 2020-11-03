import type * as T from "@effect-ts/core/Sync"

import { getApplyConfig } from "../../HKT"

export const EncoderURI = "EncoderURI" as const

export type EncoderURI = typeof EncoderURI

export const encoderApplyConfig = getApplyConfig(EncoderURI)

export interface Encoder<A, E> {
  encode: (e: A) => T.Sync<unknown, never, E>
}

declare module "../../HKT" {
  interface ConfigType<E, A> {
    [EncoderURI]: Encoder<A, E>
  }

  interface URItoKind<R, E, A> {
    [EncoderURI]: (env: R) => EncoderType<A, E>
  }
}

export class EncoderType<A, E> {
  _A!: A
  _URI!: EncoderURI
  constructor(public encoder: Encoder<A, E>) {}
}
