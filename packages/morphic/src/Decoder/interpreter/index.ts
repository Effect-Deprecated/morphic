// ets_tracing: off

import type { AnyEnv } from "../../HKT/index.js"
import { memo, merge } from "../../Utils/index.js"
import { decoderExtensionsInterpreter } from "./extensions.js"
import { decoderHashMapInterpreter } from "./hashMap.js"
import { decoderIntersectionInterpreter } from "./intersection.js"
import { decoderNewtypeInterpreter } from "./newtype.js"
import { decoderObjectInterpreter } from "./object.js"
import { decoderPrimitiveInterpreter } from "./primitives.js"
import { decoderRecordInterpreter } from "./record.js"
import { decoderRecursiveInterpreter } from "./recursive.js"
import { decoderRefinedInterpreter } from "./refined.js"
import { decoderSetInterpreter } from "./set.js"
import { decoderTaggedUnionInterpreter } from "./tagged-union.js"
import { decoderUnionInterpreter } from "./union.js"
import { decoderUnknownInterpreter } from "./unknown.js"

export const allModelDecoder = <Env extends AnyEnv>() =>
  merge(
    decoderRefinedInterpreter<Env>(),
    decoderNewtypeInterpreter<Env>(),
    decoderUnknownInterpreter<Env>(),
    decoderPrimitiveInterpreter<Env>(),
    decoderIntersectionInterpreter<Env>(),
    decoderObjectInterpreter<Env>(),
    decoderTaggedUnionInterpreter<Env>(),
    decoderRecursiveInterpreter<Env>(),
    decoderRecordInterpreter<Env>(),
    decoderHashMapInterpreter<Env>(),
    decoderSetInterpreter<Env>(),
    decoderUnionInterpreter<Env>(),
    decoderExtensionsInterpreter<Env>()
  )

export const modelDecoderInterpreter = memo(allModelDecoder) as typeof allModelDecoder

export { decoderIntersectionInterpreter } from "./intersection.js"
export { decoderNewtypeInterpreter } from "./newtype.js"
export { decoderObjectInterpreter } from "./object.js"
export { decoderPrimitiveInterpreter } from "./primitives.js"
export { decoderRecordInterpreter } from "./record.js"
export { decoderHashMapInterpreter } from "./hashMap.js"
export { decoderRecursiveInterpreter } from "./recursive.js"
export { decoderRefinedInterpreter } from "./refined.js"
export { decoderSetInterpreter } from "./set.js"
export { decoderTaggedUnionInterpreter } from "./tagged-union.js"
export { decoderUnionInterpreter } from "./union.js"
export { decoderUnknownInterpreter } from "./unknown.js"
export { decoderExtensionsInterpreter, decoderExtension } from "./extensions.js"
