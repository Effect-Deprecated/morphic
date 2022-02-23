// ets_tracing: off

import type { M } from "../Batteries/summoner/index.js"
import { guard } from "../Guard/index.js"

export function asserts<E, A>(
  F: M<{}, E, A>,
  a: unknown,
  message?: string
): asserts a is A {
  const g = guard(F)
  if (!g.is(a)) {
    throw new Error(message || "invalid type")
  }
}
