// ets_tracing: off

import type {
  AlgebraExtensions,
  ExtensionsURI
} from "../../Algebra/Extensions/index.js"
import type { Algebra, AnyEnv } from "../../HKT/index.js"
import { interpreter } from "../../HKT/index.js"
import { GuardURI } from "../base/index.js"

export const interpreters: Omit<Algebra<ExtensionsURI, GuardURI, any>, "_F"> = {} as any

export function guardExtension<
  K extends Exclude<keyof AlgebraExtensions<GuardURI, any>, "_F">
>(K: K): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, GuardURI, Env>[K]) => void
export function guardExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const guardExtensionsInterpreter = interpreter<GuardURI, ExtensionsURI>()(
  () => ({
    _F: GuardURI,
    ...interpreters
  })
)
