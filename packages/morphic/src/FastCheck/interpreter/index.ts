// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { fcExtensionsInterpreter } from "./extensions.js"
import { fcHashMapInterpreter } from "./hashMap.js"
import { fcIntersectionInterpreter } from "./intersection.js"
import { fcNewtypeInterpreter } from "./newtype.js"
import { fcObjectInterpreter } from "./object.js"
import { fcPrimitiveInterpreter } from "./primitives.js"
import { fcStrMapInterpreter } from "./record.js"
import { fcRecursiveInterpreter } from "./recursive.js"
import { fcRefinedInterpreter } from "./refined.js"
import { fcSetInterpreter } from "./set.js"
import { fcTaggedUnionInterpreter } from "./tagged-union.js"
import { fcUnionInterpreter } from "./union.js"
import { fcUnknownInterpreter } from "./unknown.js"

export const allModelFC = <Env extends AnyEnv>() =>
  merge(
    fcRefinedInterpreter<Env>(),
    fcNewtypeInterpreter<Env>(),
    fcUnknownInterpreter<Env>(),
    fcPrimitiveInterpreter<Env>(),
    fcIntersectionInterpreter<Env>(),
    fcObjectInterpreter<Env>(),
    fcTaggedUnionInterpreter<Env>(),
    fcRecursiveInterpreter<Env>(),
    fcStrMapInterpreter<Env>(),
    fcHashMapInterpreter<Env>(),
    fcSetInterpreter<Env>(),
    fcUnionInterpreter<Env>(),
    fcExtensionsInterpreter<Env>()
  )

export const modelFcInterpreter = memo(allModelFC) as typeof allModelFC

export { fcIntersectionInterpreter } from "./intersection.js"
export { fcNewtypeInterpreter } from "./newtype.js"
export { fcObjectInterpreter } from "./object.js"
export { fcPrimitiveInterpreter } from "./primitives.js"
export { fcStrMapInterpreter } from "./record.js"
export { fcHashMapInterpreter } from "./hashMap.js"
export { fcRecursiveInterpreter } from "./recursive.js"
export { fcRefinedInterpreter } from "./refined.js"
export { fcSetInterpreter } from "./set.js"
export { fcTaggedUnionInterpreter } from "./tagged-union.js"
export { fcUnionInterpreter } from "./union.js"
export { fcUnknownInterpreter } from "./unknown.js"
export { fcExtensionsInterpreter, fcExtension } from "./extensions.js"
