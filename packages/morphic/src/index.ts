// ets_tracing: off

import type { M, M_ } from "./Batteries/summoner/index.js"
import { opaque, opaque_, summonFor } from "./Batteries/summoner/index.js"

//
// Summoner
//

export { Summoner, summonFor as makeFor } from "./Batteries/summoner/index.js"

//
// Opaque
//
export type { AType, EType, RType } from "./Batteries/usage/utils/index.js"

//
// URIS
//
export { FastCheckURI } from "./FastCheck/base/index.js"
export { GuardURI } from "./Guard/base/index.js"
export { DecoderURI } from "./Decoder/base/index.js"
export { EncoderURI } from "./Encoder/base/index.js"
export { EqURI } from "./Equal/base/index.js"
export { ShowURI } from "./Show/base/index.js"
export { StrictURI } from "./Strict/base/index.js"
export { TypeHashURI as HashURI } from "./TypeHash/base/index.js"
export { ReorderURI } from "./Reorder/base/index.js"

//
// Threading configs
//
export {} from "./FastCheck/interpreter/configs.js"
export {} from "./Guard/interpreter/configs.js"
export {} from "./Decoder/interpreter/configs.js"
export {} from "./Encoder/interpreter/configs.js"
export {} from "./Equal/interpreter/configs.js"
export {} from "./Show/interpreter/configs.js"
export {} from "./Strict/interpreter/configs.js"
export {} from "./TypeHash/interpreter/configs.js"
export {} from "./Reorder/interpreter/configs.js"

//
// Generics
//
export type { M, M_ }
export { opaque, opaque_ }

//
// Defaults
//
export const { make, makeADT, makeProgram } =
  /*#__PURE__*/
  (() => summonFor({}))()
