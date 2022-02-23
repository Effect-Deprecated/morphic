// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { showExtensionsInterpreter } from "./extensions.js"
import { showIntersectionInterpreter } from "./intersection.js"
import { showNewtypeInterpreter } from "./newtype.js"
import { showObjectInterpreter } from "./object.js"
import { showPrimitiveInterpreter } from "./primitives.js"
import { showRecordInterpreter } from "./record.js"
import { showRecursiveInterpreter } from "./recursive.js"
import { showRefinedInterpreter } from "./refined.js"
import { showSetInterpreter } from "./set.js"
import { showTaggedUnionInterpreter } from "./tagged-union.js"
import { showUnionInterpreter } from "./union.js"
import { showUnknownInterpreter } from "./unknown.js"

export const allModelShow = <Env extends AnyEnv>() =>
  merge(
    showRefinedInterpreter<Env>(),
    showNewtypeInterpreter<Env>(),
    showUnknownInterpreter<Env>(),
    showPrimitiveInterpreter<Env>(),
    showIntersectionInterpreter<Env>(),
    showObjectInterpreter<Env>(),
    showTaggedUnionInterpreter<Env>(),
    showRecursiveInterpreter<Env>(),
    showSetInterpreter<Env>(),
    showRecordInterpreter<Env>(),
    showUnionInterpreter<Env>(),
    showExtensionsInterpreter<Env>()
  )

export const modelShowInterpreter = memo(allModelShow) as typeof allModelShow

export { showIntersectionInterpreter } from "./intersection.js"
export { showNewtypeInterpreter } from "./newtype.js"
export { showObjectInterpreter } from "./object.js"
export { showPrimitiveInterpreter } from "./primitives.js"
export { showRecordInterpreter } from "./record.js"
export { showRecursiveInterpreter } from "./recursive.js"
export { showRefinedInterpreter } from "./refined.js"
export { showSetInterpreter } from "./set.js"
export { showTaggedUnionInterpreter } from "./tagged-union.js"
export { showUnionInterpreter } from "./union.js"
export { showUnknownInterpreter } from "./unknown.js"
export { showExtensionsInterpreter, showExtension } from "./extensions.js"
