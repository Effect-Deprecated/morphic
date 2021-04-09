// tracing: off

import type { InterfaceLA, IntersectionLA, TaggedUnionLA } from "../../Algebra/Config"
import type { HKT, Kind } from "../../HKT"
import type { TypeHash, TypeHashURI } from "../base"

declare module "../../Algebra/Intersection" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [TypeHashURI]: {
      typeHashes: IntersectionLA<L, A, TypeHashURI>
    }
  }
}

declare module "../../Algebra/Newtype" {
  interface IsoConfig<L, A, N> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface PrismConfig<L, A, N> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/Object" {
  interface InterfaceConfig<Props> {
    [TypeHashURI]: {
      typeHash: InterfaceLA<Props, TypeHashURI>
    }
  }
  interface PartialConfig<Props> {
    [TypeHashURI]: {
      typeHash: InterfaceLA<Props, TypeHashURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [TypeHashURI]: {
      typeHash: InterfaceLA<Props & PropsPartial, TypeHashURI>
      typeHashPartial: InterfaceLA<PropsPartial, TypeHashURI>
    }
  }
}

declare module "../../Algebra/Primitives" {
  interface NonEmptyArrayConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface ArrayConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface NullableConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface MutableConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface OptionalConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [TypeHashURI]: {
      left: TypeHash
      right: TypeHash
    }
  }
  interface OptionConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [TypeHashURI]: {
      typeHashes: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? TypeHash
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined" {
  interface RefinedConfig<E, A, B> {
    [TypeHashURI]: {
      typeHash: TypeHash
      typeHashRefined: TypeHash
    }
  }
  interface PredicateConfig<E, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/Set" {
  interface SetConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/Record" {
  interface RecordConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/TaggedUnion" {
  interface TaggedUnionConfig<Types> {
    [TypeHashURI]: {
      typeHashes: TaggedUnionLA<Types, TypeHashURI>
    }
  }
}

declare module "../../Algebra/Union" {
  interface UnionConfig<Types> {
    [TypeHashURI]: {
      typeHashes: {
        [k in keyof Types]: TypeHash
      }
    }
  }
}
