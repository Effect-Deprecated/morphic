// tracing: off

import type { AlgebraExtensions, ExtensionsURI } from "../../Algebra/Extensions"
import type { Algebra, AnyEnv } from "../../HKT"
import { interpreter } from "../../HKT"
import { EncoderURI } from "../base"

export const interpreters: Omit<
  Algebra<ExtensionsURI, EncoderURI, any>,
  "_F"
> = {} as any

export function encoderExtension<
  K extends Exclude<keyof AlgebraExtensions<EncoderURI, any>, "_F">
>(
  K: K
): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, EncoderURI, Env>[K]) => void
export function encoderExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const encoderExtensionsInterpreter = interpreter<EncoderURI, ExtensionsURI>()(
  () => ({
    _F: EncoderURI,
    ...interpreters
  })
)
