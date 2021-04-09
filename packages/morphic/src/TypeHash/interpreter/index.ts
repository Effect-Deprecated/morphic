// tracing: off

import type { AnyEnv } from "../../HKT"
import { memo, merge } from "../../Utils"
import { typeHashExtensionsInterpreter } from "./extensions"
import { typeHashIntersectionInterpreter } from "./intersection"
import { typeHashNewtypeInterpreter } from "./newtype"
import { typeHashObjectInterpreter } from "./object"
import { typeHashPrimitiveInterpreter } from "./primitives"
import { typeHashRecordInterpreter } from "./record"
import { typeHashRecursiveInterpreter } from "./recursive"
import { typeHashRefinedInterpreter } from "./refined"
import { typeHashSetInterpreter } from "./set"
import { typeHashTaggedUnionInterpreter } from "./tagged-union"
import { typeHashUnionInterpreter } from "./union"
import { typeHashUnknownInterpreter } from "./unknown"

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
    typeHashUnionInterpreter<Env>(),
    typeHashExtensionsInterpreter<Env>()
  )

export const modelHashInterpreter = memo(allModelHash) as typeof allModelHash

export { typeHashIntersectionInterpreter } from "./intersection"
export { typeHashNewtypeInterpreter } from "./newtype"
export { typeHashObjectInterpreter } from "./object"
export { typeHashPrimitiveInterpreter } from "./primitives"
export { typeHashRecordInterpreter } from "./record"
export { typeHashRecursiveInterpreter } from "./recursive"
export { typeHashRefinedInterpreter } from "./refined"
export { typeHashSetInterpreter } from "./set"
export { typeHashTaggedUnionInterpreter } from "./tagged-union"
export { typeHashUnionInterpreter } from "./union"
export { typeHashUnknownInterpreter } from "./unknown"
export { typeHashExtensionsInterpreter, typeHashExtension } from "./extensions"
