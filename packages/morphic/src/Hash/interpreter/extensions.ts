// tracing: off

import type { AlgebraExtensions, ExtensionsURI } from "../../Algebra/Extensions"
import type { Algebra, AnyEnv } from "../../HKT"
import { interpreter } from "../../HKT"
import { HashURI } from "../base"

export const interpreters: Omit<Algebra<ExtensionsURI, HashURI, any>, "_F"> = {} as any

export function hashExtension<
  K extends Exclude<keyof AlgebraExtensions<HashURI, any>, "_F">
>(K: K): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, HashURI, Env>[K]) => void
export function hashExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const hashExtensionsInterpreter = interpreter<HashURI, ExtensionsURI>()(() => ({
  _F: HashURI,
  ...interpreters
}))
