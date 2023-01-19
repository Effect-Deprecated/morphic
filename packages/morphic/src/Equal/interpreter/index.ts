// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { eqExtensionsInterpreter } from "./extensions.js"
import { eqHashMapInterpreter } from "./hashMap.js"
import { eqIntersectionInterpreter } from "./intersection.js"
import { eqNewtypeInterpreter } from "./newtype.js"
import { eqObjectInterpreter } from "./object.js"
import { eqPrimitiveInterpreter } from "./primitives.js"
import { eqRecordMapInterpreter } from "./record.js"
import { eqRecursiveInterpreter } from "./recursive.js"
import { eqRefinedInterpreter } from "./refined.js"
import { eqSetInterpreter } from "./set.js"
import { eqTaggedUnionInterpreter } from "./tagged-union.js"
import { eqUnionInterpreter } from "./union.js"
import { eqUnknownInterpreter } from "./unknown.js"

export const allModelEq = <Env extends AnyEnv>() =>
  merge(
    eqRefinedInterpreter<Env>(),
    eqNewtypeInterpreter<Env>(),
    eqUnknownInterpreter<Env>(),
    eqPrimitiveInterpreter<Env>(),
    eqIntersectionInterpreter<Env>(),
    eqObjectInterpreter<Env>(),
    eqTaggedUnionInterpreter<Env>(),
    eqRecursiveInterpreter<Env>(),
    eqRecordMapInterpreter<Env>(),
    eqHashMapInterpreter<Env>(),
    eqSetInterpreter<Env>(),
    eqUnionInterpreter<Env>(),
    eqExtensionsInterpreter<Env>()
  )

export const modelEqInterpreter = memo(allModelEq) as typeof allModelEq

export { eqIntersectionInterpreter } from "./intersection.js"
export { eqNewtypeInterpreter } from "./newtype.js"
export { eqObjectInterpreter } from "./object.js"
export { eqPrimitiveInterpreter } from "./primitives.js"
export { eqRecordMapInterpreter } from "./record.js"
export { eqHashMapInterpreter } from "./hashMap.js"
export { eqRecursiveInterpreter } from "./recursive.js"
export { eqRefinedInterpreter } from "./refined.js"
export { eqSetInterpreter } from "./set.js"
export { eqTaggedUnionInterpreter } from "./tagged-union.js"
export { eqUnionInterpreter } from "./union.js"
export { eqUnknownInterpreter } from "./unknown.js"
export { eqExtensionsInterpreter, eqExtension } from "./extensions.js"
