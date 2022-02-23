// ets_tracing: off

import type {
  AlgebraExtensions,
  ExtensionsURI
} from "../../Algebra/Extensions/index.js"
import type { Algebra, AnyEnv } from "../../HKT/index.js"
import { interpreter } from "../../HKT/index.js"
import { EqURI } from "../base/index.js"

export const interpreters: Omit<Algebra<ExtensionsURI, EqURI, any>, "_F"> = {} as any

export function eqExtension<
  K extends Exclude<keyof AlgebraExtensions<EqURI, any>, "_F">
>(K: K): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, EqURI, Env>[K]) => void
export function eqExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const eqExtensionsInterpreter = interpreter<EqURI, ExtensionsURI>()(() => ({
  _F: EqURI,
  ...interpreters
}))
