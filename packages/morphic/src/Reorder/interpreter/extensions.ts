// tracing: off

import type { AlgebraExtensions, ExtensionsURI } from "../../Algebra/Extensions"
import type { Algebra, AnyEnv } from "../../HKT"
import { interpreter } from "../../HKT"
import { ReorderURI } from "../base"

export const interpreters: Omit<Algebra<ExtensionsURI, ReorderURI, any>, "_F"> =
  {} as any

export function reorderExtension<
  K extends Exclude<keyof AlgebraExtensions<ReorderURI, any>, "_F">
>(
  K: K
): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, ReorderURI, Env>[K]) => void
export function reorderExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const reorderExtensionsInterpreter = interpreter<ReorderURI, ExtensionsURI>()(
  () => ({
    _F: ReorderURI,
    ...interpreters
  })
)
