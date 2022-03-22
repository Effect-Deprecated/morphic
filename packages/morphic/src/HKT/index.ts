// ets_tracing: off

import type { UnionToIntersection } from "@effect-ts/core/Utils"

import type { AlgebraExtensions, ExtensionsURI } from "../Algebra/Extensions/index.js"
import type { AlgebraHashMap, HashMapURI } from "../Algebra/HashMap/index.js"
import type {
  AlgebraIntersections,
  IntersectionURI
} from "../Algebra/Intersection/index.js"
import type { AlgebraNewtypes, NewtypeURI } from "../Algebra/Newtype/index.js"
import type { AlgebraObjects, ObjectURI } from "../Algebra/Object/index.js"
import type { AlgebraPrimitives, PrimitivesURI } from "../Algebra/Primitives/index.js"
import type { AlgebraRecord, RecordURI } from "../Algebra/Record/index.js"
import type { AlgebraRecursive, RecursiveURI } from "../Algebra/Recursive/index.js"
import type { AlgebraRefined, RefinedURI } from "../Algebra/Refined/index.js"
import type { AlgebraSet, SetURI } from "../Algebra/Set/index.js"
import type {
  AlgebraTaggedUnion,
  TaggedUnionURI
} from "../Algebra/TaggedUnion/index.js"
import type { AlgebraUnion, UnionURI } from "../Algebra/Union/index.js"
import type { AlgebraUnknown, UnknownURI } from "../Algebra/Unknown/index.js"
import { memo } from "../Utils/index.js"

export type URISIndexedAny = Readonly<Record<InterpreterURIS, any>>

export type AnyEnv = Partial<URISIndexedAny>

export interface GenConfig<A, R, K> {
  (a: A, r: R, k: K): A
}

export type NoEnv = unknown

export type MapToGenConfig<R extends AnyEnv, T extends URISIndexedAny, K> = {
  [k in Exclude<InterpreterURIS, "HKT">]?: GenConfig<T[k], R[k], ThreadURI<K, k>>
}

export interface ConfigType<E, A> {
  readonly _E: E
  readonly _A: A

  readonly ["HKT"]: never
}

export interface ConfigExtensions {}

export type ConfigsForType<R extends AnyEnv, E, A, K = {}> = MapToGenConfig<
  R,
  ConfigType<E, A>,
  K
>

export type ThreadURI<C, URI extends InterpreterURIS> = URI extends keyof C
  ? C[URI]
  : unknown

export const getApplyConfig: <Uri extends InterpreterURIS>(
  uri: Uri
) => <Config>(config?: Config) => NonNullable<ThreadURI<Config, Uri>> =
  (uri) => (config) =>
    ((a: any, r: any, k: any) =>
      ((config && (config as any)[uri] ? (config as any)[uri] : <A>(a: A) => a) as any)(
        a,
        r[uri],
        k
      )) as any

export type Named<A> = {
  name?: string
  conf?: A
  extensions?: ConfigExtensions
}

export interface HKT<R, E, A> {
  readonly _tag: "HKT"

  readonly _R: (_R: R) => void
  readonly _E: E
  readonly _A: A
}

export interface URItoKind<R, E, A> {
  readonly _R: R
  readonly _E: E
  readonly _A: A

  readonly ["HKT"]: HKT<R, E, A>
}

export type InterpreterURIS = Exclude<
  keyof URItoKind<any, any, any>,
  "_A" | "_E" | "_R" | "_C"
>

export type Kind<URI extends InterpreterURIS, R, E, A> = URI extends InterpreterURIS
  ? URItoKind<R, E, A>[URI]
  : any

export interface URItoAlgebra<F extends InterpreterURIS, Env extends AnyEnv> {
  _F: F
  _R: Env

  [PrimitivesURI]: AlgebraPrimitives<F, Env>
  [TaggedUnionURI]: AlgebraTaggedUnion<F, Env>
  [UnionURI]: AlgebraUnion<F, Env>
  [IntersectionURI]: AlgebraIntersections<F, Env>
  [ObjectURI]: AlgebraObjects<F, Env>
  [NewtypeURI]: AlgebraNewtypes<F, Env>
  [RecordURI]: AlgebraRecord<F, Env>
  [HashMapURI]: AlgebraHashMap<F, Env>
  [RecursiveURI]: AlgebraRecursive<F, Env>
  [RefinedURI]: AlgebraRefined<F, Env>
  [SetURI]: AlgebraSet<F, Env>
  [UnknownURI]: AlgebraUnknown<F, Env>
  [ExtensionsURI]: AlgebraExtensions<F, Env>
}

export type AlgebraURIS = Exclude<keyof URItoAlgebra<never, never>, "_F" | "_R">

export type ConfigTypeURIS = keyof ConfigType<any, any>

export type ConfigTypeKind<URI extends ConfigTypeURIS, E, A> = ConfigType<E, A>[URI]

export type GetAlgebra<A extends AlgebraURIS> = A

export type Algebra<
  AllAlgebra extends AlgebraURIS,
  Interp extends InterpreterURIS,
  Env extends AnyEnv
> = UnionToIntersection<URItoAlgebra<Interp, Env>[AllAlgebra]>

export function interpreter<IURI extends InterpreterURIS, AURI extends AlgebraURIS>(): (
  i: <Env extends AnyEnv>() => Algebra<AURI, IURI, Env>
) => <Env extends AnyEnv>() => Algebra<AURI, IURI, Env>
export function interpreter() {
  return (i: () => any) => memo(i)
}
