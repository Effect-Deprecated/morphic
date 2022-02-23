// ets_tracing: off

import type { SelectKeyOfMatchingValues } from "../utils/index.js"

export interface InterpreterResult<E, A>
  extends Record<string, { build: (x: A) => A }> {}

export type InterpreterURI = keyof InterpreterResult<any, any>

export type SelectInterpURIs<E, A, ShapeConstraint> = SelectKeyOfMatchingValues<
  InterpreterResult<E, A>,
  ShapeConstraint
>
