// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { strictExtensionsInterpreter } from "./extensions.js"
import { strictIntersectionInterpreter } from "./intersection.js"
import { strictNewtypeInterpreter } from "./newtype.js"
import { strictObjectInterpreter } from "./object.js"
import { strictPrimitiveInterpreter } from "./primitives.js"
import { strictRecordInterpreter } from "./record.js"
import { strictRecursiveInterpreter } from "./recursive.js"
import { strictRefinedInterpreter } from "./refined.js"
import { strictSetInterpreter } from "./set.js"
import { strictTaggedUnionInterpreter } from "./tagged-union.js"
import { strictUnionInterpreter } from "./union.js"
import { strictUnknownInterpreter } from "./unknown.js"

export const allModelStrict = <Env extends AnyEnv>() =>
  merge(
    strictRefinedInterpreter<Env>(),
    strictNewtypeInterpreter<Env>(),
    strictUnknownInterpreter<Env>(),
    strictPrimitiveInterpreter<Env>(),
    strictIntersectionInterpreter<Env>(),
    strictObjectInterpreter<Env>(),
    strictTaggedUnionInterpreter<Env>(),
    strictRecursiveInterpreter<Env>(),
    strictRecordInterpreter<Env>(),
    strictSetInterpreter<Env>(),
    strictUnionInterpreter<Env>(),
    strictExtensionsInterpreter<Env>()
  )

export const modelStrictInterpreter = memo(allModelStrict) as typeof allModelStrict

export { strictIntersectionInterpreter } from "./intersection.js"
export { strictNewtypeInterpreter } from "./newtype.js"
export { strictObjectInterpreter } from "./object.js"
export { strictPrimitiveInterpreter } from "./primitives.js"
export { strictRecordInterpreter } from "./record.js"
export { strictRecursiveInterpreter } from "./recursive.js"
export { strictRefinedInterpreter } from "./refined.js"
export { strictSetInterpreter } from "./set.js"
export { strictTaggedUnionInterpreter } from "./tagged-union.js"
export { strictUnionInterpreter } from "./union.js"
export { strictUnknownInterpreter } from "./unknown.js"
export { strictExtensionsInterpreter, strictExtension } from "./extensions.js"
