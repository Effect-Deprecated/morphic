// ets_tracing: off

import type {
  AlgebraExtensions,
  ExtensionsURI
} from "../../Algebra/Extensions/index.js"
import type { Algebra, AnyEnv } from "../../HKT/index.js"
import { interpreter } from "../../HKT/index.js"
import { StrictURI } from "../base/index.js"

export const interpreters: Omit<
  Algebra<ExtensionsURI, StrictURI, any>,
  "_F"
> = {} as any

export function strictExtension<
  K extends Exclude<keyof AlgebraExtensions<StrictURI, any>, "_F">
>(
  K: K
): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, StrictURI, Env>[K]) => void
export function strictExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const strictExtensionsInterpreter = interpreter<StrictURI, ExtensionsURI>()(
  () => ({
    _F: StrictURI,
    ...interpreters
  })
)
