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
export { FastCheckURI } from "./FastCheck/hkt"
export { GuardURI } from "./Guard/hkt"
export { DecoderURI } from "./Decoder/hkt"

//
// Threading configs
//
export {} from "./FastCheck/interpreter/configs"
export {} from "./Guard/interpreter/configs"
export {} from "./Decoder/interpreter/configs"

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
