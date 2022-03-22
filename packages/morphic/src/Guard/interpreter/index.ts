// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { guardExtensionsInterpreter } from "./extensions.js"
import { guardHashMapInterpreter } from "./hashMap.js"
import { guardIntersectionInterpreter } from "./intersection.js"
import { guardNewtypeInterpreter } from "./newtype.js"
import { guardObjectInterpreter } from "./object.js"
import { guardPrimitiveInterpreter } from "./primitives.js"
import { guardRecordInterpreter } from "./record.js"
import { guardRecursiveInterpreter } from "./recursive.js"
import { guardRefinedInterpreter } from "./refined.js"
import { guardSetInterpreter } from "./set.js"
import { guardTaggedUnionInterpreter } from "./tagged-union.js"
import { guardUnionInterpreter } from "./union.js"
import { guardUnknownInterpreter } from "./unknown.js"

export const allModelGuard = <Env extends AnyEnv>() =>
  merge(
    guardRefinedInterpreter<Env>(),
    guardNewtypeInterpreter<Env>(),
    guardUnknownInterpreter<Env>(),
    guardPrimitiveInterpreter<Env>(),
    guardIntersectionInterpreter<Env>(),
    guardObjectInterpreter<Env>(),
    guardTaggedUnionInterpreter<Env>(),
    guardRecursiveInterpreter<Env>(),
    guardRecordInterpreter<Env>(),
    guardHashMapInterpreter<Env>(),
    guardSetInterpreter<Env>(),
    guardUnionInterpreter<Env>(),
    guardExtensionsInterpreter<Env>()
  )

export const modelGuardInterpreter = memo(allModelGuard) as typeof allModelGuard

export { guardIntersectionInterpreter } from "./intersection.js"
export { guardNewtypeInterpreter } from "./newtype.js"
export { guardObjectInterpreter } from "./object.js"
export { guardPrimitiveInterpreter } from "./primitives.js"
export { guardRecordInterpreter } from "./record.js"
export { guardHashMapInterpreter } from "./hashMap.js"
export { guardRecursiveInterpreter } from "./recursive.js"
export { guardRefinedInterpreter } from "./refined.js"
export { guardSetInterpreter } from "./set.js"
export { guardTaggedUnionInterpreter } from "./tagged-union.js"
export { guardUnionInterpreter } from "./union.js"
export { guardUnknownInterpreter } from "./unknown.js"
export { guardExtensionsInterpreter, guardExtension } from "./extensions.js"
