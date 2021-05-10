// tracing: off

import type { AlgebraExtensions, ExtensionsURI } from "../../Algebra/Extensions"
import type { Algebra, AnyEnv } from "../../HKT"
import { interpreter } from "../../HKT"
import { DecoderURI } from "../base"

export const interpreters: Omit<Algebra<ExtensionsURI, DecoderURI, any>, "_F"> =
  {} as any

export function decoderExtension<
  K extends Exclude<keyof AlgebraExtensions<DecoderURI, any>, "_F">
>(
  K: K
): (i: <Env extends AnyEnv>() => Algebra<ExtensionsURI, DecoderURI, Env>[K]) => void
export function decoderExtension(K: any) {
  return (i: () => any) => {
    interpreters[K] = i()
  }
}

export const decoderExtensionsInterpreter = interpreter<DecoderURI, ExtensionsURI>()(
  () => ({
    _F: DecoderURI,
    ...interpreters
  })
)
