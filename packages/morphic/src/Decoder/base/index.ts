// ets_tracing: off

import { getApplyConfig } from "../../HKT/index.js"
import type { Decoder } from "../common/index.js"

export const DecoderURI = "DecoderURI" as const

export type DecoderURI = typeof DecoderURI

export const decoderApplyConfig = getApplyConfig(DecoderURI)

declare module "../../HKT/index.js" {
  interface ConfigType<E, A> {
    [DecoderURI]: Decoder<A>
  }
  interface URItoKind<R, E, A> {
    [DecoderURI]: (env: R) => DecoderType<A>
  }
}

export class DecoderType<A> {
  _A!: A
  _URI!: DecoderURI
  childs: any = {}
  constructor(public decoder: Decoder<A>) {}
  setChilds(childs: any) {
    this.childs = childs
    return this
  }
  getChilds() {
    return this.childs
  }
  at<K extends keyof A>(k: K): DecoderType<A[K]> | undefined {
    return this.childs[k]
  }
}
