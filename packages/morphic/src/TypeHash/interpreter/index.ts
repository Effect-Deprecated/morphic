// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { typeHashExtensionsInterpreter } from "./extensions.js"
import { typeHashHashMapInterpreter } from "./hashMap.js"
import { typeHashIntersectionInterpreter } from "./intersection.js"
import { typeHashNewtypeInterpreter } from "./newtype.js"
import { typeHashObjectInterpreter } from "./object.js"
import { typeHashPrimitiveInterpreter } from "./primitives.js"
import { typeHashRecordInterpreter } from "./record.js"
import { typeHashRecursiveInterpreter } from "./recursive.js"
import { typeHashRefinedInterpreter } from "./refined.js"
import { typeHashSetInterpreter } from "./set.js"
import { typeHashTaggedUnionInterpreter } from "./tagged-union.js"
import { typeHashUnionInterpreter } from "./union.js"
import { typeHashUnknownInterpreter } from "./unknown.js"

export const allModelHash = <Env extends AnyEnv>() =>
  merge(
    typeHashRefinedInterpreter<Env>(),
    typeHashNewtypeInterpreter<Env>(),
    typeHashUnknownInterpreter<Env>(),
    typeHashPrimitiveInterpreter<Env>(),
    typeHashIntersectionInterpreter<Env>(),
    typeHashObjectInterpreter<Env>(),
    typeHashTaggedUnionInterpreter<Env>(),
    typeHashRecursiveInterpreter<Env>(),
    typeHashSetInterpreter<Env>(),
    typeHashRecordInterpreter<Env>(),
    typeHashHashMapInterpreter<Env>(),
    typeHashUnionInterpreter<Env>(),
    typeHashExtensionsInterpreter<Env>()
  )

export const modelHashInterpreter = memo(allModelHash) as typeof allModelHash

export { typeHashIntersectionInterpreter } from "./intersection.js"
export { typeHashNewtypeInterpreter } from "./newtype.js"
export { typeHashObjectInterpreter } from "./object.js"
export { typeHashPrimitiveInterpreter } from "./primitives.js"
export { typeHashRecordInterpreter } from "./record.js"
export { typeHashHashMapInterpreter } from "./hashMap.js"
export { typeHashRecursiveInterpreter } from "./recursive.js"
export { typeHashRefinedInterpreter } from "./refined.js"
export { typeHashSetInterpreter } from "./set.js"
export { typeHashTaggedUnionInterpreter } from "./tagged-union.js"
export { typeHashUnionInterpreter } from "./union.js"
export { typeHashUnknownInterpreter } from "./unknown.js"
export { typeHashExtensionsInterpreter, typeHashExtension } from "./extensions.js"
