// tracing: off

import type { AlgebraExtensions, ExtensionsURI } from "../../Algebra/Extensions"
import type { Algebra, AnyEnv } from "../../HKT"
import { interpreter } from "../../HKT"
import { ShowURI } from "../base"

export const interpreters: Omit<Algebra<ExtensionsURI, ShowURI, any>, "_F"> = {} as any

export function showExtension<
  K extends Exclude<keyof AlgebraExtensions<ShowURI, any>, "_F">
>(K: K): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, ShowURI, Env>[K]) => void
export function showExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const showExtensionsInterpreter = interpreter<ShowURI, ExtensionsURI>()(() => ({
  _F: ShowURI,
  ...interpreters
}))
