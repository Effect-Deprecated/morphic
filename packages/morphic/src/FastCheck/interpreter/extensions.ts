// tracing: off

import type { AlgebraExtensions, ExtensionsURI } from "../../Algebra/Extensions"
import type { Algebra, AnyEnv } from "../../HKT"
import { interpreter } from "../../HKT"
import { mapRecord } from "../../Utils"
import { FastCheckURI } from "../base"

export const interpreters: Omit<Algebra<ExtensionsURI, FastCheckURI, any>, "_F"> =
  {} as any

export function fcExtension<
  K extends Exclude<keyof AlgebraExtensions<FastCheckURI, any>, "_F">
>(
  K: K
): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, FastCheckURI, Env>[K]) => void
export function fcExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const fcExtensionsInterpreter = interpreter<FastCheckURI, ExtensionsURI>()(
  () => ({
    _F: FastCheckURI,
    ...mapRecord(interpreters, () => ({} as any))
  })
)
