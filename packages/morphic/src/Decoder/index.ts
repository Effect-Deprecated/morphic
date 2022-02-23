// ets_tracing: off

import { flow } from "@effect-ts/core/Function"
import { runEither } from "@effect-ts/core/Sync"

import type { M, Summoner } from "../Batteries/summoner/index.js"
import { summonFor } from "../Batteries/summoner/index.js"
import type { Materialized } from "../Batteries/usage/materializer/index.js"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "../Batteries/usage/summoner/index.js"
import type { DecoderType, DecoderURI } from "./base/index.js"
import type { Decoder } from "./common/index.js"
import { modelDecoderInterpreter } from "./interpreter/index.js"

export { decoderExtension } from "./interpreter/index.js"

export { DecoderType, DecoderURI, decoderApplyConfig } from "./base/index.js"

export {
  appendContext,
  Context,
  ContextEntry,
  Decode,
  Decoder,
  Errors,
  fail,
  failures,
  makeDecoder,
  Validate,
  Validation,
  ValidationError,
  Reporter
} from "./common/index.js"

export {
  report,
  formatValidationErrors,
  formatValidationError,
  TYPE_MAX_LEN,
  ReporterOptions
} from "./reporters/index.js"

export function deriveFor<S extends Summoner<any>>(S: S) {
  return (_: {
      [k in DecoderURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k]
    }) =>
    <L, A>(
      F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
    ) =>
      F.derive(modelDecoderInterpreter<SummonerEnv<S>>())(_)
}

const decoders = new Map<any, any>()
const defDerive = deriveFor(summonFor({}).make)({})

export function decoder<E, A>(F: M<{}, E, A>): Decoder<A> {
  if (decoders.has(F)) {
    return decoders.get(F).decoder
  }
  const d = defDerive(F)
  decoders.set(F, d)
  return d.decoder
}

export function decoderType<E, A>(F: M<{}, E, A>): DecoderType<A> {
  if (decoders.has(F)) {
    return decoders.get(F)
  }
  const d = defDerive(F)
  decoders.set(F, d)
  return d
}

export function runDecode<E, A>(F: M<{}, E, A>) {
  return flow(decoder(F).decode, runEither)
}

export function decode<E, A>(F: M<{}, E, A>) {
  return decoder(F).decode
}
