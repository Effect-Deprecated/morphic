// ets_tracing: off

import type {
  AlgebraExtensions,
  ExtensionsURI
} from "../../Algebra/Extensions/index.js"
import type { Algebra, AnyEnv } from "../../HKT/index.js"
import { interpreter } from "../../HKT/index.js"
import { TypeHashURI } from "../base/index.js"

export const interpreters: Omit<
  Algebra<ExtensionsURI, TypeHashURI, any>,
  "_F"
> = {} as any

export function typeHashExtension<
  K extends Exclude<keyof AlgebraExtensions<TypeHashURI, any>, "_F">
>(
  K: K
): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, TypeHashURI, Env>[K]) => void
export function typeHashExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const typeHashExtensionsInterpreter = interpreter<TypeHashURI, ExtensionsURI>()(
  () => ({
    _F: TypeHashURI,
    ...interpreters
  })
)
