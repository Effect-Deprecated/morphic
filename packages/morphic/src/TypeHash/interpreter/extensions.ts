// tracing: off

import type { AlgebraExtensions, ExtensionsURI } from "../../Algebra/Extensions"
import type { Algebra, AnyEnv } from "../../HKT"
import { interpreter } from "../../HKT"
import { TypeHashURI } from "../base"

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
