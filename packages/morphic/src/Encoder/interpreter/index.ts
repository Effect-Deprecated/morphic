// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { encoderExtensionsInterpreter } from "./extensions.js"
import { encoderIntersectionInterpreter } from "./intersection.js"
import { encoderNewtypeInterpreter } from "./newtype.js"
import { encoderObjectInterpreter } from "./object.js"
import { encoderPrimitiveInterpreter } from "./primitives.js"
import { encoderRecordInterpreter } from "./record.js"
import { encoderRecursiveInterpreter } from "./recursive.js"
import { encoderRefinedInterpreter } from "./refined.js"
import { encoderSetInterpreter } from "./set.js"
import { encoderTaggedUnionInterpreter } from "./tagged-union.js"
import { encoderUnionInterpreter } from "./union.js"
import { encoderUnknownInterpreter } from "./unknown.js"

export const allModelEncoder = <Env extends AnyEnv>() =>
  merge(
    encoderRefinedInterpreter<Env>(),
    encoderNewtypeInterpreter<Env>(),
    encoderUnknownInterpreter<Env>(),
    encoderPrimitiveInterpreter<Env>(),
    encoderIntersectionInterpreter<Env>(),
    encoderObjectInterpreter<Env>(),
    encoderTaggedUnionInterpreter<Env>(),
    encoderRecursiveInterpreter<Env>(),
    encoderRecordInterpreter<Env>(),
    encoderSetInterpreter<Env>(),
    encoderUnionInterpreter<Env>(),
    encoderExtensionsInterpreter<Env>()
  )

export const modelEncoderInterpreter = memo(allModelEncoder) as typeof allModelEncoder

export { encoderIntersectionInterpreter } from "./intersection.js"
export { encoderNewtypeInterpreter } from "./newtype.js"
export { encoderObjectInterpreter } from "./object.js"
export { encoderPrimitiveInterpreter } from "./primitives.js"
export { encoderRecordInterpreter } from "./record.js"
export { encoderRecursiveInterpreter } from "./recursive.js"
export { encoderRefinedInterpreter } from "./refined.js"
export { encoderSetInterpreter } from "./set.js"
export { encoderTaggedUnionInterpreter } from "./tagged-union.js"
export { encoderUnionInterpreter } from "./union.js"
export { encoderUnknownInterpreter } from "./unknown.js"
export { encoderExtensionsInterpreter, encoderExtension } from "./extensions.js"
