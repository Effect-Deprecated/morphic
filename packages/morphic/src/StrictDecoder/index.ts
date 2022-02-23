// ets_tracing: off

import { flow } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { M } from "../Batteries/summoner/index.js"
import type { Decoder } from "../Decoder/common/index.js"
import { makeDecoder } from "../Decoder/common/index.js"
import { decoder } from "../Decoder/index.js"
import { strict } from "../Strict/index.js"

function strictDecoder_<E, A>(F: M<{}, E, A>): Decoder<A> {
  const d = decoder(F)
  return makeDecoder(flow(d.validate, T.chain(strict(F).shrink)), d.codecType, d.name)
}

const decoders = new Map<any, any>()

export function strictDecoder<E, A>(F: M<{}, E, A>): Decoder<A> {
  if (decoders.has(F)) {
    return decoders.get(F)
  }
  const d = strictDecoder_(F)
  decoders.set(F, d)
  return d
}
