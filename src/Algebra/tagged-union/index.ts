import type { AnyEnv, ConfigsForType } from "../config"
import type { HKT2, Kind, Kind2, URIS, URIS2 } from "../utils/hkt"

export const TaggedUnionURI = "TaggedUnionURI" as const

export type TaggedUnionURI = typeof TaggedUnionURI

declare module "../utils/hkt" {
  export interface Algebra<F, Env> {
    [TaggedUnionURI]: AlgebraTaggedUnion<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [TaggedUnionURI]: AlgebraTaggedUnion1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [TaggedUnionURI]: AlgebraTaggedUnion2<F, Env>
  }
}

export type TaggedValues<Tag extends string, O> = {
  [o in keyof O]: O[o] & { [t in Tag]: o }
}

export type TaggedTypes<F, Tag extends string, L, A, R> = {
  [o in keyof A & keyof L]: HKT2<F, R, L[o], (A & { [x in o]: { [k in Tag]: o } })[o]>
}

type DecorateTag<
  X extends HKT2<any, any, any, any>,
  Tag extends string,
  VTag
> = X extends HKT2<infer F, infer R, infer L, infer A>
  ? HKT2<F, R, L, A & { [k in Tag]: VTag }>
  : never

export interface TaggedUnionConfig<Types> {}

export interface AlgebraTaggedUnion<F, Env> {
  _F: F
  taggedUnion: {
    <Tag extends string, Types extends TaggedTypes<F, Tag, any, any, Env>>(
      tag: Tag,
      types: Types & { [o in keyof Types]: DecorateTag<Types[o], Tag, o> },
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          Types[keyof Types]["_E"],
          Types[keyof Types]["_A"],
          TaggedUnionConfig<Types>
        >
      }
    ): HKT2<F, Env, Types[keyof Types]["_E"], Types[keyof Types]["_A"]>
  }
}

export type TaggedTypes1<F extends URIS, Tag extends string, O, R> = {
  [o in keyof O]: Kind<F, R, O[o] & { [t in Tag]: o }>
}

export interface AlgebraTaggedUnion1<F extends URIS, Env extends AnyEnv> {
  _F: F
  taggedUnion<Tag extends string, O>(
    tag: Tag,
    types: TaggedTypes1<F, Tag, O, Env>,
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        unknown,
        TaggedValues<Tag, O>[keyof O],
        TaggedUnionConfig<TaggedValues<Tag, O>>
      >
    }
  ): Kind<F, Env, TaggedValues<Tag, O>[keyof O]>
}

export type TaggedTypes2<F extends URIS2, Tag extends string, L, A, R> = {
  [o in keyof A & keyof L]: Kind2<
    F,
    R,
    A[o] & { [t in Tag]: o },
    L[o] & { [t in Tag]: o }
  >
}

export interface AlgebraTaggedUnion2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  taggedUnion<Tag extends string, A, L>(
    tag: Tag,
    types: TaggedTypes2<F, Tag, A, L, Env>,
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        TaggedValues<Tag, L>[keyof L],
        TaggedValues<Tag, A>[keyof A],
        TaggedUnionConfig<TaggedValues<Tag, L>>
      >
    }
  ): Kind2<F, Env, TaggedValues<Tag, L>[keyof L], TaggedValues<Tag, A>[keyof A]>
}
