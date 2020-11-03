import type { M, M_ } from "./Batteries/summoner"
import { opaque, opaque_, summonFor } from "./Batteries/summoner"

//
// Summoner
//

export { Summoner, summonFor as makeFor } from "./Batteries/summoner"

//
// Opaque
//
export type { AType, EType, RType } from "./Batteries/usage/utils"

//
// URIS
//
export { FastCheckURI } from "./FastCheck/base"
//export { GuardURI } from "./Guard/hkt"
//export { DecoderURI } from "./Decoder/hkt"
//export { EncoderURI } from "./Encoder/hkt"
export { EqURI } from "./Equal/base"
//export { ShowURI } from "./Show/hkt"
//export { StrictURI } from "./Strict/hkt"

//
// Threading configs
//
export {} from "./FastCheck/interpreter/configs"
//export {} from "./Guard/interpreter/configs"
//export {} from "./Decoder/interpreter/configs"
//export {} from "./Encoder/interpreter/configs"
export {} from "./Equal/interpreter/configs"
//export {} from "./Show/interpreter/configs"
//export {} from "./Strict/interpreter/configs"

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
