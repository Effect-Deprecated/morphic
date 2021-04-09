// tracing: off

import type { AnyEnv, InterpreterURIS } from "../../HKT"

export const ExtensionsURI = "ExtensionsURI"
export type ExtensionsURI = typeof ExtensionsURI

export interface AlgebraExtensions<F extends InterpreterURIS, Env extends AnyEnv> {
  _F: F
}
