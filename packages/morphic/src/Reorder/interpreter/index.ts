// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { reorderExtensionsInterpreter } from "./extensions.js"
import { reorderIntersectionInterpreter } from "./intersection.js"
import { reorderNewtypeInterpreter } from "./newtype.js"
import { reorderObjectInterpreter } from "./object.js"
import { reorderPrimitiveInterpreter } from "./primitives.js"
import { reorderRecordInterpreter } from "./record.js"
import { reorderRecursiveInterpreter } from "./recursive.js"
import { reorderRefinedInterpreter } from "./refined.js"
import { reorderSetInterpreter } from "./set.js"
import { reorderTaggedUnionInterpreter } from "./tagged-union.js"
import { reorderUnionInterpreter } from "./union.js"
import { reorderUnknownInterpreter } from "./unknown.js"

export const allModelReorder = <Env extends AnyEnv>() =>
  merge(
    reorderRefinedInterpreter<Env>(),
    reorderNewtypeInterpreter<Env>(),
    reorderUnknownInterpreter<Env>(),
    reorderPrimitiveInterpreter<Env>(),
    reorderIntersectionInterpreter<Env>(),
    reorderObjectInterpreter<Env>(),
    reorderTaggedUnionInterpreter<Env>(),
    reorderRecursiveInterpreter<Env>(),
    reorderRecordInterpreter<Env>(),
    reorderSetInterpreter<Env>(),
    reorderUnionInterpreter<Env>(),
    reorderExtensionsInterpreter<Env>()
  )

export const modelReorderInterpreter = memo(allModelReorder) as typeof allModelReorder

export { reorderIntersectionInterpreter } from "./intersection.js"
export { reorderNewtypeInterpreter } from "./newtype.js"
export { reorderObjectInterpreter } from "./object.js"
export { reorderPrimitiveInterpreter } from "./primitives.js"
export { reorderRecordInterpreter } from "./record.js"
export { reorderRecursiveInterpreter } from "./recursive.js"
export { reorderRefinedInterpreter } from "./refined.js"
export { reorderSetInterpreter } from "./set.js"
export { reorderTaggedUnionInterpreter } from "./tagged-union.js"
export { reorderUnionInterpreter } from "./union.js"
export { reorderUnknownInterpreter } from "./unknown.js"
export { reorderExtensionsInterpreter, reorderExtension } from "./extensions.js"
